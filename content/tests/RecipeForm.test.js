import {
  render,
  cleanup,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import App from "devtools/components/App";
import RecipeFormPage from "devtools/components/pages/RecipeFormPage";
import {
  filtersApiResponseFactory,
  extensionFactory,
} from "devtools/tests/factories/api";
import ExperimenterAPI from "devtools/utils/experimenterApi";
import NormandyAPI from "devtools/utils/normandyApi";

import {
  versionFoFactory,
  channelFoFactory,
  bucketSampleFoFactory,
} from "./factories/filterObjects";
import {
  recipeFactory,
  addonStudyBranchFactory,
  multiPrefBranchFactory,
} from "./factories/recipes";

describe("The `RecipeForm` component", () => {
  afterEach(async () => {
    await jest.clearAllMocks();
    await cleanup();
  });

  const findForm = (formGroups, formName) => {
    const forms = formGroups.filter((form) =>
      within(form).queryByText(formName),
    );
    if (!forms.length) {
      throw new Error(`Form ${formName} not found in group`);
    }

    return forms.reduce((a, b) => (a.length <= b.length ? a : b));
  };

  const getForms = (formGroups) => {
    const nameForm = findForm(formGroups, "Name");
    const experimenterSlugForm = findForm(formGroups, "Experimenter Slug");
    const samplingTypeForm = findForm(formGroups, "Sampling Type");
    const channelForm = findForm(formGroups, "Channel");
    const versionForm = findForm(formGroups, "Version");
    const countriesForm = findForm(formGroups, "Countries");
    const localesForm = findForm(formGroups, "Locales");
    const fallbackFOForm = findForm(formGroups, "Additional Filter Objects");
    const actionForm = findForm(formGroups, "Action");
    return {
      nameForm,
      experimenterSlugForm,
      samplingTypeForm,
      channelForm,
      versionForm,
      countriesForm,
      localesForm,
      fallbackFOForm,
      actionForm,
    };
  };

  const getPrefFields = (forms) => {
    const experimentSlugForm = findForm(forms, "Experiment Slug");
    const preferenceNameForm = findForm(forms, "Preference Name");
    const experimentDocURLForm = findForm(forms, "Experiment Document URL");
    const prefTypeForm = findForm(forms, "Preference Type");
    const prefBranchTypeForm = findForm(forms, "Preference Branch Type");
    const highVolumeForm = findForm(forms, "High Volume Recipe");
    const preventEnrollmentForm = findForm(forms, "Prevent New Enrollment");
    const addBranchForm = findForm(forms, "Add Branch");

    const experimentSlugField = experimentSlugForm.querySelector("input");
    const prefNameField = preferenceNameForm.querySelector("input");
    const expUrlField = experimentDocURLForm.querySelector("input");

    const prefTypeField = within(prefTypeForm).getByRole("combobox");
    const prefBranchTypeField = within(prefBranchTypeForm).getByRole(
      "combobox",
    );
    const highVolumeField = within(highVolumeForm).getByRole("button");
    const preventNewEnrollField = within(preventEnrollmentForm).getByRole(
      "button",
    );
    const addBranchButton = within(addBranchForm).getByText("Add Branch");

    return {
      experimentSlugField,
      prefNameField,
      expUrlField,
      prefTypeField,
      prefBranchTypeField,
      highVolumeField,
      preventNewEnrollField,
      addBranchButton,
    };
  };

  const getAddonFields = (forms) => {
    const studyNameForm = findForm(forms, "Study Name");
    const studyDescriptionForm = findForm(forms, "Study Description");
    const extensionForm = findForm(forms, "Extension");
    const preventNewEnrollmentForm = findForm(forms, "Prevent New Enrollment");

    return {
      studyNameForm,
      studyDescriptionForm,
      extensionForm,
      preventNewEnrollmentForm,
    };
  };

  const getHeartBeatFields = (forms) => {
    const surveyIDForm = findForm(forms, "Survey ID");
    const engagementButtonForm = findForm(forms, "Engagement Button Label");
    const messageForm = findForm(forms, "Message");
    const thanksMessageForm = findForm(forms, "Thanks Message");
    const learnMessageForm = findForm(forms, "Learn More Message");
    const learnMoreUrlForm = findForm(forms, "Learn More Url");
    const postAnswerURLForm = findForm(forms, "Post-Answer URL");
    const promptForm = findForm(forms, "How often should the prompt be shown?");
    const includeTelemetryForm = findForm(forms, "Include Telemetry UUID?");
    return {
      surveyIDForm,
      engagementButtonForm,
      messageForm,
      thanksMessageForm,
      learnMessageForm,
      learnMoreUrlForm,
      postAnswerURLForm,
      promptForm,
      includeTelemetryForm,
    };
  };

  const setup = (recipe) => {
    const pageResponse = { results: [recipe] };
    const filtersResponse = filtersApiResponseFactory.build(
      {},
      { countryCount: 3, localeCount: 3 },
    );

    jest
      .spyOn(NormandyAPI.prototype, "fetchRecipePage")
      .mockImplementation(() => Promise.resolve(pageResponse));
    jest
      .spyOn(NormandyAPI.prototype, "fetchFilters")
      .mockImplementation(() => Promise.resolve(filtersResponse));
    jest
      .spyOn(NormandyAPI.prototype, "fetchAllActions")
      .mockImplementation(() =>
        Promise.resolve([
          { id: 1, name: "show-heartbeat" },
          { id: 2, name: "opt-out-study" },
          { id: 3, name: "preference-experiment" },
          { id: 4, name: "console-log" },
        ]),
      );

    jest
      .spyOn(NormandyAPI.prototype, "saveRecipe")
      .mockImplementation(() => Promise.resolve(jest.fn()));

    jest
      .spyOn(NormandyAPI.prototype, "fetchRecipe")
      .mockImplementation(() => Promise.resolve(recipe));
  };

  const extensionSetup = () => {
    const extensions = extensionFactory.buildCount(3);

    jest
      .spyOn(NormandyAPI.prototype, "fetchAllExtensions")
      .mockImplementation(() => Promise.resolve(extensions));

    return extensions;
  };

  const consoleLogRecipeSetup = () => {
    const versions = versionFoFactory.build({}, { generateVersionsCount: 2 });
    const channels = channelFoFactory.build({}, { generateChannelsCount: 1 });
    const sample = bucketSampleFoFactory.build();
    const filterObject = [versions, sample, channels];
    return recipeFactory.build(
      {},
      {
        actionName: "console-log",
        filterObject,
      },
    );
  };

  const branchedAddonSetup = () => {
    const channels = channelFoFactory.build({}, { generateChannelsCount: 1 });
    const filter_object = [channels];
    const branches = addonStudyBranchFactory.buildCount(2);
    return recipeFactory.build({
      latest_revision: {
        action: { name: "branched-addon-study" },
        arguments: { branches },
        filter_object,
      },
    });
  };

  it("creation pref recipe form", async () => {
    const recipe = recipeFactory.build();
    setup(recipe);
    const { getByText, getAllByRole } = await render(<App />);
    fireEvent.click(getByText("Create Recipe"));
    await waitFor(() =>
      expect(getByText("Experimenter Slug")).toBeInTheDocument(),
    );
    let formGroups = getAllByRole("group");

    const {
      nameForm,
      experimenterSlugForm,
      samplingTypeForm,
      channelForm,
      versionForm,
      actionForm,
    } = getForms(formGroups);

    const nameInput = nameForm.querySelector("input");
    const experimenterSlugInput = experimenterSlugForm.querySelector("input");
    const versionInput = versionForm.querySelector("input");
    const samplingInput = within(samplingTypeForm).getByRole("combobox");

    fireEvent.change(nameInput, { target: { value: "Recipe Name" } });
    fireEvent.change(experimenterSlugInput, {
      target: { value: "the-experimenter-slug" },
    });

    fireEvent.click(samplingInput);
    fireEvent.click(getByText("Stable"));

    formGroups = getAllByRole("group");

    const rateForm = findForm(formGroups, "Rate");
    const inputForm = findForm(formGroups, "Input");
    const rateInput = rateForm.querySelector("input");
    const inputInput = within(inputForm).getByRole("combobox");

    fireEvent.change(rateInput, { target: { value: 5 } });
    fireEvent.click(inputInput);
    fireEvent.click(getByText("normandy.recipe.id"));

    fireEvent.change(versionInput, { target: { value: 88 } });
    fireEvent.click(versionForm.querySelector("button"));
    fireEvent.click(getByText("Add"));
    fireEvent.click(versionForm.querySelector("button"));
    fireEvent.click(getByText("Add"));

    fireEvent.click(within(channelForm).getByText("Beta"));
    fireEvent.click(within(channelForm).getByText("Release"));

    const actionInput = within(actionForm).getByRole("combobox");
    expect(NormandyAPI.prototype.fetchAllActions).toHaveBeenCalled();
    fireEvent.click(actionInput);
    fireEvent.click(getByText("preference-experiment"));

    formGroups = getAllByRole("group");
    const {
      experimentSlugField,
      prefNameField,
      expUrlField,
      prefTypeField,
      prefBranchTypeField,
      highVolumeField,
      preventNewEnrollField,
      addBranchButton,
    } = getPrefFields(formGroups);

    fireEvent.change(experimentSlugField, {
      target: { value: "experimenter-slug-field" },
    });
    fireEvent.change(prefNameField, { target: { value: "pref1.name" } });
    fireEvent.change(expUrlField, { target: { value: "https://example.com" } });

    fireEvent.click(prefTypeField);
    fireEvent.click(getByText("String"));

    fireEvent.click(prefBranchTypeField);
    fireEvent.click(getByText("User"));

    fireEvent.click(highVolumeField);
    fireEvent.click(preventNewEnrollField);

    fireEvent.click(addBranchButton);

    formGroups = getAllByRole("group");
    const branchNameForm = findForm(formGroups, "Branch Name");
    const valueForm = findForm(formGroups, "Value");

    const branchNameInput = branchNameForm.querySelector("input");
    const valueInput = valueForm.querySelector("input");

    fireEvent.change(branchNameInput, { target: { value: "branch1" } });
    fireEvent.change(valueInput, { target: { value: "pref value" } });

    getByText("Save");
    fireEvent.click(getByText("Save"));

    const modalDialog = getAllByRole("dialog")[0];
    const commentInput = modalDialog.querySelector("textArea");
    const saveMessage = "Created Recipe";
    fireEvent.change(commentInput, { target: { value: saveMessage } });

    fireEvent.click(within(modalDialog).getByText("Save"));

    expect(NormandyAPI.prototype.saveRecipe).toBeCalledWith(undefined, {
      action_id: 3,
      arguments: {
        branches: [
          {
            ratio: 1,
            slug: "branch1",
            value: "pref value",
          },
        ],
        experimentDocumentUrl: "https://example.com",
        isEnrollmentPaused: true,
        isHighPopulation: true,
        preferenceBranchType: "user",
        preferenceName: "pref1.name",
        preferenceType: "string",
        slug: "experimenter-slug-field",
      },
      comment: saveMessage,
      experimenter_slug: "the-experimenter-slug",
      filter_object: [
        { input: ["normandy.recipe.id"], rate: 0.05, type: "stableSample" },
        {
          type: "version",
          versions: [89, 90],
        },
        {
          channels: ["beta", "release"],
          type: "channel",
        },
      ],
      name: "Recipe Name",
    });
  });

  it("edit recipe form", async () => {
    const recipeData = branchedAddonSetup();
    const extensions = extensionSetup();
    setup(recipeData);
    const doc = await render(<App />);

    await waitFor(() =>
      expect(doc.getByTitle("recipe-menu")).toBeInTheDocument(),
    );

    fireEvent.mouseEnter(await doc.findByTitle("recipe-menu"));
    fireEvent.click(await doc.findByText("Edit"));

    await waitFor(() => {
      expect(doc.getByText("Experimenter Slug")).toBeInTheDocument();
    });

    let formGroups = doc.getAllByRole("group");

    const { nameForm, experimenterSlugForm, channelForm } = getForms(
      formGroups,
    );

    const nameInput = nameForm.querySelector("input");
    const experimenterSlugInput = experimenterSlugForm.querySelector("input");

    const name = "A new Recipe Name";
    const experimenter_slug = "the-new-experimenter-slug";

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(experimenterSlugInput, {
      target: { value: experimenter_slug },
    });

    const all_channels = ["Nightly", "Developer Edition", "Beta", "Release"];
    for (const channel of all_channels) {
      fireEvent.click(within(channelForm).getByText(channel));
    }

    formGroups = doc.getAllByRole("group");
    let branches = findForm(formGroups, "Branches");

    let branchButtons = branches.querySelectorAll("button");
    const firstDeleteButton = branchButtons[0];
    fireEvent.click(firstDeleteButton);

    formGroups = doc.getAllByRole("group");
    branches = findForm(formGroups, "Branches");

    branchButtons = branches.querySelectorAll("button");
    const secondBranchButton = branchButtons[0];

    fireEvent.click(secondBranchButton);

    fireEvent.click(doc.getByText("Add Branch"));

    formGroups = doc.getAllByRole("group");
    branches = findForm(formGroups, "Branches");
    const branchGroups = within(branches).getAllByRole("group");
    const slugForm = findForm(branchGroups, "Slug");
    const ratioForm = findForm(branchGroups, "Ratio");
    const extensionForm = findForm(branchGroups, "Extension");

    const slugInput = slugForm.querySelector("input");
    const ratioInput = ratioForm.querySelector("input");
    const extensionInput = within(extensionForm).getByRole("combobox");

    const slug = "addon-slug";
    const ratio = 25;
    const selectedExtension = extensions[1];

    fireEvent.change(slugInput, { target: { value: slug } });
    fireEvent.change(ratioInput, { target: { value: ratio } });
    fireEvent.click(extensionInput);
    fireEvent.click(doc.getByText(selectedExtension.name));

    fireEvent.click(doc.getByText("Save"));

    const modalDialog = doc.getAllByRole("dialog")[0];
    const commentInput = modalDialog.querySelector("textArea");
    const saveMessage = "Edited Recipe";
    fireEvent.change(commentInput, { target: { value: saveMessage } });

    fireEvent.click(within(modalDialog).getByText("Save"));

    let {
      latest_revision: { action, ...updatedRecipeData },
    } = recipeData;

    const channelValues = ["nightly", "aurora", "beta", "release"];

    updatedRecipeData = {
      ...updatedRecipeData,
      experimenter_slug,
      name,
      comment: saveMessage,
      // @ts-ignore
      action_id: action.id,
      arguments: {
        ...updatedRecipeData.arguments,
        branches: [{ slug, ratio, extensionApiId: selectedExtension.id }],
      },
      filter_object: updatedRecipeData.filter_object.map((fo) => {
        if (fo.type === "channel") {
          return {
            ...fo,
            // @ts-ignore
            channels: channelValues.filter((c) => !fo.channels.includes(c)),
          };
        }

        return fo;
      }),
    };

    expect(NormandyAPI.prototype.saveRecipe).toBeCalledWith(
      recipeData.id.toString(),
      updatedRecipeData,
    );
  });

  it("save button is re-enabled when form errors are addressed", async () => {
    const recipeData = consoleLogRecipeSetup();
    await setup(recipeData);
    const doc = await render(<App />);

    fireEvent.click(doc.getByText("Recipes"));
    await waitFor(() => {
      expect(
        doc.getByText(recipeData.latest_revision.name),
      ).toBeInTheDocument();
    });
    fireEvent.mouseEnter(doc.getByTitle("recipe-menu"));
    fireEvent.click(doc.getByText("Edit"));
    await waitFor(() => {
      expect(doc.getByText("Experimenter Slug")).toBeInTheDocument();
    });

    const formGroups = doc.getAllByRole("group");
    const { fallbackFOForm } = getForms(formGroups);

    const saveButton = doc.getByText("Save");
    expect(saveButton).not.toHaveAttribute("disabled");

    const foCodeBlock = fallbackFOForm.querySelector("textarea");

    // Technically this should be a more specific ClipboardEvent, but JSDom
    // doesn't really like that, so fake it and tell TypeScript that it's fine.
    const clipboardEvent = new Event("paste", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    // @ts-ignore
    clipboardEvent.clipboardData = {
      getData: () => "invalid json!",
    };

    foCodeBlock.dispatchEvent(clipboardEvent);

    expect(doc.getByText("[]invalid json!")).toBeInTheDocument();
    expect(
      doc.getByText("Filter Object(s) is not valid JSON"),
    ).toBeInTheDocument();
    expect(
      doc.getByText("Filter Object(s) is not contained in an array"),
    ).toBeInTheDocument();
    expect(saveButton).toHaveAttribute("disabled");

    //ctrl z... the paste
    foCodeBlock.dispatchEvent(new Event("focus"));
    foCodeBlock.dispatchEvent(
      // @ts-ignore
      new KeyboardEvent("keydown", { keyCode: 90, ctrlKey: true }),
    );

    expect(doc.getByText("[]")).toBeInTheDocument();
    expect(saveButton).not.toHaveAttribute("disabled");

    fireEvent.click(saveButton);

    const modalDialog = doc.getAllByRole("dialog")[0];
    const commentInput = modalDialog.querySelector("textArea");
    const saveMessage = "Edited Recipe";
    fireEvent.change(commentInput, { target: { value: saveMessage } });

    fireEvent.click(within(modalDialog).getByText("Save"));

    let {
      latest_revision: { action, ...updatedRecipeData },
    } = recipeData;

    updatedRecipeData = {
      ...updatedRecipeData,
      comment: saveMessage,
      // @ts-ignore
      action_id: action.id,
    };

    expect(NormandyAPI.prototype.saveRecipe).toBeCalledWith(
      recipeData.id.toString(),
      updatedRecipeData,
    );
  });

  it("should have isEnrollmentPaused set when import from experimenter", async () => {
    const versions = versionFoFactory.build({}, { generateVersionsCount: 2 });
    const branches = multiPrefBranchFactory.buildCount(2);
    const recipe = recipeFactory.build({
      latest_revision: {
        action: { name: "multi-preference-experiment" },
        arguments: { branches },
        filter_object: [versions],
      },
    });

    setup(recipe);

    /** @type Record<string, any> */
    const experimenterRecipe = { ...recipe.latest_revision };
    experimenterRecipe.action_name = experimenterRecipe.action.name;
    experimenterRecipe.comment = "";
    delete experimenterRecipe.action;
    jest
      .spyOn(ExperimenterAPI.prototype, "fetchRecipe")
      .mockImplementation(() => Promise.resolve(experimenterRecipe));

    jest
      .spyOn(NormandyAPI.prototype, "fetchAllActions")
      .mockImplementation(() =>
        Promise.resolve([recipe.latest_revision.action]),
      );

    const doc = await renderWithContext(<RecipeFormPage />, {
      route: "/prod/recipes/import/experimenter-slug",
      path: "/prod/recipes/import/:experimenterSlug",
    });
    const { getByText, getAllByRole } = doc;
    expect(ExperimenterAPI.prototype.fetchRecipe).toHaveBeenCalled();

    await waitFor(() => {
      expect(getByText("Experimenter Slug")).toBeInTheDocument();
    });

    const formGroups = getAllByRole("group");
    const highVolumeForm = findForm(formGroups, "High Volume Recipe");
    const highVolumeToggle = within(highVolumeForm).getByRole("button");

    fireEvent.click(highVolumeToggle);

    fireEvent.click(getByText("Save"));

    const modalDialog = getAllByRole("dialog")[0];
    const commentInput = modalDialog.querySelector("textArea");
    const saveMessage = "Edited Recipe";
    fireEvent.change(commentInput, { target: { value: saveMessage } });

    fireEvent.click(within(modalDialog).getByText("Save"));

    let { action: _omitAction, ...updatedRecipeData } = recipe.latest_revision;
    updatedRecipeData = {
      ...updatedRecipeData,
      comment: saveMessage,
      // @ts-ignore
      action_id: recipe.latest_revision.action.id,
      arguments: {
        ...updatedRecipeData.arguments,
        // @ts-ignore
        isHighPopulation: true,
        isEnrollmentPaused: false,
      },
    };
    expect(NormandyAPI.prototype.saveRecipe).toBeCalledWith(
      undefined,
      updatedRecipeData,
    );
  });

  it("create show heart beat recipe", async () => {
    const recipe = recipeFactory.build();
    setup(recipe);

    const { getByText, getAllByRole } = await render(<App />);

    fireEvent.click(getByText("Recipes"));
    fireEvent.click(getByText("Create Recipe"));

    await waitFor(() =>
      expect(getByText("Experimenter Slug")).toBeInTheDocument(),
    );
    let formGroups = getAllByRole("group");

    const {
      nameForm,
      experimenterSlugForm,
      channelForm,
      actionForm,
    } = getForms(formGroups);

    const nameInput = nameForm.querySelector("input");
    const experimenterSlugInput = experimenterSlugForm.querySelector("input");

    fireEvent.change(nameInput, { target: { value: "Recipe Name" } });
    fireEvent.change(experimenterSlugInput, {
      target: { value: "the-experimenter-slug" },
    });

    fireEvent.click(within(channelForm).getByText("Release"));

    const actionInput = within(actionForm).getByRole("combobox");
    expect(NormandyAPI.prototype.fetchAllActions).toHaveBeenCalled();
    fireEvent.click(actionInput);
    fireEvent.click(getByText("show-heartbeat"));

    formGroups = getAllByRole("group");
    const {
      surveyIDForm,
      engagementButtonForm,
      messageForm,
      thanksMessageForm,
      learnMessageForm,
      learnMoreUrlForm,
      postAnswerURLForm,
      promptForm,
      includeTelemetryForm,
    } = getHeartBeatFields(formGroups);

    const surveyIDInput = surveyIDForm.querySelector("input");
    const engagementInput = engagementButtonForm.querySelector("input");
    const messageInput = messageForm.querySelector("input");
    const thanksMessageInput = thanksMessageForm.querySelector("input");
    const learnMessageInput = learnMessageForm.querySelector("input");
    const learnMoreUrlInput = learnMoreUrlForm.querySelector("input");
    const postAnswerURLInput = postAnswerURLForm.querySelector("input");
    const promptInput = within(promptForm).getByRole("combobox");
    const includeTelemetryToggle = within(includeTelemetryForm).getByRole(
      "button",
    );

    const surveyId = "survey-id";
    const engagementButton = "take survey";
    const message = "it's the message of the survey!";
    const thanksMessage = "thank you!";
    const learnMessage = "learn more";
    const learnMoreUrl = "https://example.com/learnmore";
    const postAnswerUrl = "https://example.com";

    fireEvent.change(surveyIDInput, { target: { value: surveyId } });
    fireEvent.change(engagementInput, { target: { value: engagementButton } });
    fireEvent.change(messageInput, { target: { value: message } });
    fireEvent.change(thanksMessageInput, { target: { value: thanksMessage } });
    fireEvent.change(learnMessageInput, { target: { value: learnMessage } });
    fireEvent.change(learnMoreUrlInput, { target: { value: learnMoreUrl } });
    fireEvent.change(postAnswerURLInput, { target: { value: postAnswerUrl } });

    fireEvent.click(promptInput);
    fireEvent.click(getByText("Show users every X days."));
    expect(getByText("Days before user is reprompted")).toBeInTheDocument();

    formGroups = getAllByRole("group");
    const repromptForm = findForm(formGroups, "Days before user is reprompted");
    const repromptInput = repromptForm.querySelector("input");
    fireEvent.change(repromptInput, { target: { value: 4 } });

    fireEvent.click(includeTelemetryToggle);

    getByText("Save");
    fireEvent.click(getByText("Save"));

    const modalDialog = getAllByRole("dialog")[0];
    const commentInput = modalDialog.querySelector("textArea");
    const saveMessage = "Created Recipe";
    fireEvent.change(commentInput, { target: { value: saveMessage } });

    fireEvent.click(within(modalDialog).getByText("Save"));

    expect(NormandyAPI.prototype.saveRecipe).toBeCalledWith(undefined, {
      action_id: 1,
      arguments: {
        learnMoreUrl,
        message,
        postAnswerUrl,
        surveyId,
        thanksMessage,
        engagementButtonLabel: engagementButton,
        includeTelemetryUUID: true,
        learnMoreMessage: learnMessage,
        repeatEvery: 4,
        repeatOption: "xdays",
      },
      comment: "Created Recipe",
      experimenter_slug: "the-experimenter-slug",
      filter_object: [{ channels: ["release"], type: "channel" }],
      name: "Recipe Name",
    });
  });

  it("fallback editor is rendered for unknown action types", async () => {
    const recipeData = recipeFactory.build({
      latest_revision: { action: { name: "unknown" } },
    });
    setup(recipeData);
    const doc = await render(<App />);
    fireEvent.click(await doc.findByText(recipeData.latest_revision.name));
    fireEvent.click(doc.getByText("Edit Recipe"));

    expect(await doc.findByText("Experimenter Slug")).toBeInTheDocument();
    expect(await doc.findByText("Action Arguments")).toBeInTheDocument();
  });

  it("creation addon recipe form", async () => {
    const recipe = recipeFactory.build();
    setup(recipe);
    const extensions = extensionSetup();

    const { getByText, getAllByRole } = await render(<App />);

    fireEvent.click(getByText("Recipes"));
    fireEvent.click(getByText("Create Recipe"));

    await waitFor(() =>
      expect(getByText("Experimenter Slug")).toBeInTheDocument(),
    );
    let formGroups = getAllByRole("group");

    const {
      nameForm,
      experimenterSlugForm,
      channelForm,
      actionForm,
    } = getForms(formGroups);

    const nameInput = nameForm.querySelector("input");
    const experimenterSlugInput = experimenterSlugForm.querySelector("input");

    fireEvent.change(nameInput, { target: { value: "Recipe Name" } });
    fireEvent.change(experimenterSlugInput, {
      target: { value: "the-experimenter-slug" },
    });

    fireEvent.click(within(channelForm).getByText("Release"));

    const actionInput = within(actionForm).getByRole("combobox");
    expect(NormandyAPI.prototype.fetchAllActions).toHaveBeenCalled();
    fireEvent.click(actionInput);
    fireEvent.click(getByText("opt-out-study"));
    fireEvent.click(document);

    await waitFor(() =>
      expect(NormandyAPI.prototype.fetchAllExtensions).toReturn(),
    );

    formGroups = getAllByRole("group");
    const {
      studyNameForm,
      studyDescriptionForm,
      extensionForm,
      preventNewEnrollmentForm,
    } = getAddonFields(formGroups);

    const studyNameInput = studyNameForm.querySelector("input");
    const studyDescriptionInput = studyDescriptionForm.querySelector(
      "textarea",
    );
    const extensionInput = within(extensionForm).getByRole("combobox");
    const preventNewEnrollmentToggle = within(
      preventNewEnrollmentForm,
    ).getByRole("button");

    const studyName = "Addon Study Name";
    const studyDescription =
      "This is the description of the addon study description";
    const selectedExtension = extensions[0];
    fireEvent.change(studyNameInput, { target: { value: studyName } });
    fireEvent.change(studyDescriptionInput, {
      target: { value: studyDescription },
    });

    fireEvent.click(extensionInput);
    expect(getByText(selectedExtension.name)).toBeInTheDocument();
    fireEvent.click(getByText(selectedExtension.name));
    fireEvent.click(preventNewEnrollmentToggle);

    getByText("Save");
    fireEvent.click(getByText("Save"));

    const modalDialog = getAllByRole("dialog")[0];
    const commentInput = modalDialog.querySelector("textArea");
    const saveMessage = "Created Recipe";
    fireEvent.change(commentInput, { target: { value: saveMessage } });

    fireEvent.click(within(modalDialog).getByText("Save"));

    expect(NormandyAPI.prototype.saveRecipe).toBeCalledWith(undefined, {
      action_id: 2,
      arguments: {
        addonUrl: selectedExtension.xpi,
        description: "This is the description of the addon study description",
        extensionApiId: selectedExtension.id,
        isEnrollmentPaused: true,
        name: "Addon Study Name",
      },
      comment: "Created Recipe",
      experimenter_slug: "the-experimenter-slug",
      filter_object: [{ channels: ["release"], type: "channel" }],
      name: "Recipe Name",
    });
  });
  it("fallback editor is rendered for unknown action types", async () => {
    const recipeData = recipeFactory.build({
      latest_revision: { action: { name: "unknown" } },
    });
    setup(recipeData);
    const doc = await render(<App />);
    await doc.findByText(recipeData.latest_revision.name);
    fireEvent.mouseEnter(await doc.findByTitle("recipe-menu"));
    fireEvent.click(doc.getByText("Edit"));
    await waitFor(() => {
      expect(doc.getByText("Experimenter Slug")).toBeInTheDocument();
    });

    expect(doc.getByText("Action Arguments")).toBeInTheDocument();
  });
});