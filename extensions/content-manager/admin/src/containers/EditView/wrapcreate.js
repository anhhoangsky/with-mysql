import React, {
  memo,
  useCallback,
  useMemo,
  useState,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { Tabs, useTabState, usePanelState, Panel } from "@bumaga/tabs";
import Fieldcomponentcreate from "./fieldcomponentcreate";
import Inputs from "../../components/Inputs";
import { useSelector } from "react-redux";

import InputCreate from "./inputcreate";
import LocaleToggle from "./LocaleToggle";
import { languages, languageNativeNames } from "../i18n";
import { useLocation } from "react-router-dom";
import EditViewDataManagerContext from "../../contexts/EditViewDataManager";
import { TabWrapper, TapProgress, CardWrapper } from "./components";
import { useStrapi } from "strapi-helper-plugin";
import { isEqual } from "lodash";

const ParentComponent = ({ addChild, onInitEditView, children }) => {
  const api = useContext(EditViewDataManagerContext);
  let location = useLocation().pathname;
  // let a = isEqual(api.modifiedData, api.initialData);
  if (location != "/create") {
    useEffect(() => {
      // console.log(api.initialData.international);
      if (api.modifiedData.international != undefined) {
        onInitEditView(api.modifiedData.international);
      }
    }, [api.modifiedData.international, onInitEditView]); //compTabs, compPanels,
  }

  return (
    <CardWrapper>
      <Tabs>
        <div className="mb-3">
          {children[0]}
          <LocaleToggle changeLocale={addChild} />
        </div>
        {/* <TapProgress /> */}
        {children[1]}
      </Tabs>
    </CardWrapper>
  );
};
const wrapcreate = (props) => {
  const { block, blockIndex } = props.block;
  let location = useLocation().pathname;
  // console.log(useStrapi());
  let international = false;
  for (let feilds of block) {
    if (feilds.find((field) => field.name == "locale") !== undefined) {
      international = true;
      // break;
    }
  }
  const locale =
    window.localStorage.getItem("strapi-admin-language") ||
    window.navigator.language ||
    window.navigator.userLanguage ||
    "en";

  if (!international) {
    return block.map((fieldsBlock, fieldsBlockIndex) => {
      return (
        <div className="row" key={fieldsBlockIndex}>
          {fieldsBlock.map(
            ({ name, size, fieldSchema, metadatas }, fieldIndex) => {
              const isComponent = fieldSchema.type === "component";
              if (isComponent) {
                const { component, max, min, repeatable = false } = fieldSchema;
                const componentUid = fieldSchema.component;

                return (
                  <Fieldcomponentcreate
                    locale={locale}
                    key={componentUid}
                    componentUid={component}
                    isRepeatable={repeatable}
                    label={metadatas.label}
                    max={max}
                    min={min}
                    name={name}
                  />
                );
              }
              return (
                <div className={`col-${size}`} key={name}>
                  <InputCreate
                    autoFocus={
                      blockIndex === 0 &&
                      fieldsBlockIndex === 0 &&
                      fieldIndex === 0
                    }
                    fieldSchema={fieldSchema}
                    keys={name}
                    metadatas={metadatas}
                  />
                </div>
              );
            }
          )}
        </div>
      );
    });
  }

  if (location.lastIndexOf("/")) {
    location = location.substring(location.lastIndexOf("/"));
  }

  // const cn = (...args) => args.filter(Boolean).join(" ");

  const Tab = ({ children, isAdd }) => {
    const { isActive, onClick } = useTabState(false);
    const api = useContext(EditViewDataManagerContext);
    console.log(api);
    useEffect(() => {
      if (isAdd) {
        onClick();
        // api.addInternational(children);
      }
    }, [isAdd]);
    return (
      <TabWrapper
        type="button"
        // className={cn("tab", isActive && "active")}
        isActive={isActive}
        onClick={onClick}
      >
        {isAdd
          ? children
          : languageNativeNames[api.initialData.locale] || children}
      </TabWrapper>
    );
  };

  let defaultTab;
  let defaultPanel;
  const makeDefaultTab = (language) => {
    return (
      <Tab key={`tab_${language}`} isAdd={true}>
        {languageNativeNames[language]}
      </Tab>
    );
  };
  const makeDefaultPanel = (language) => (
    <Panel key={`panel_${language}`}>
      {block.map((fieldsBlock, fieldsBlockIndex) => {
        return (
          <div className="row" key={fieldsBlockIndex}>
            {fieldsBlock.map(
              ({ name, size, fieldSchema, metadatas }, fieldIndex) => {
                const isComponent = fieldSchema.type === "component";
                name = `${name}__${language}`;

                if (isComponent) {
                  const {
                    component,
                    max,
                    min,
                    repeatable = false,
                  } = fieldSchema;
                  const componentUid = fieldSchema.component;

                  return (
                    <Fieldcomponentcreate
                      locale={language}
                      key={componentUid}
                      componentUid={component}
                      isRepeatable={repeatable}
                      label={metadatas.label}
                      max={max}
                      min={min}
                      name={name}
                    />
                  );
                }

                return (
                  <div className={`col-${size}`} key={name}>
                    <InputCreate
                      autoFocus={
                        blockIndex === 0 &&
                        fieldsBlockIndex === 0 &&
                        fieldIndex === 0
                      }
                      fieldSchema={fieldSchema}
                      keys={name}
                      metadatas={metadatas}
                    />
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </Panel>
  );

  const onInitEditView = useCallback((arrLanguage) => {
    defaultTab = arrLanguage.map(makeDefaultTab);
    defaultPanel = arrLanguage.map(makeDefaultPanel);
    setTabs(defaultTab);
    setPanel(defaultPanel);
  }, []);
  // if (location != "/create") {
  //   useEffect(() => {
  //     if (api.initialData.international != undefined)
  //       onInitEditView(api.initialData.international);
  //   }, [compTabs, compPanels, api.initialData, onInitEditView]);
  // }
  // else {
  defaultTab = [
    <Tab key={`tab_default`} isAdd={false}>
      {languageNativeNames[locale]}
    </Tab>,
  ];
  defaultPanel = [
    <Panel key={`panel_default`}>
      {block.map((fieldsBlock, fieldsBlockIndex) => {
        return (
          <div className="row" key={fieldsBlockIndex}>
            {fieldsBlock.map(
              ({ name, size, fieldSchema, metadatas }, fieldIndex) => {
                const isComponent = fieldSchema.type === "component";
                if (location == "/create") {
                  name = `${name}__${locale}`;
                }
                if (isComponent) {
                  const {
                    component,
                    max,
                    min,
                    repeatable = false,
                  } = fieldSchema;
                  const componentUid = fieldSchema.component;
                  // let newMetadatas = { ...metadatas };
                  // newMetadatas.label = newMetadatas.label + locale;
                  // componentFieldName.substring(
                  //   componentFieldName.lastIndexOf("__")
                  // );
                  return (
                    <Fieldcomponentcreate
                      //cus
                      locale={locale}
                      key={componentUid}
                      componentUid={component}
                      isRepeatable={repeatable}
                      label={metadatas.label}
                      max={max}
                      min={min}
                      name={name}
                    />
                  );
                }

                return (
                  <div className={`col-${size}`} key={name}>
                    <InputCreate
                      // <Inputs
                      autoFocus={
                        blockIndex === 0 &&
                        fieldsBlockIndex === 0 &&
                        fieldIndex === 0
                      }
                      fieldSchema={fieldSchema}
                      keys={name}
                      metadatas={metadatas}
                    />
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </Panel>,
  ];
  // }

  const [compTabs, setTabs] = useState(defaultTab);
  const [compPanels, setPanel] = useState(defaultPanel);
  const api = useContext(EditViewDataManagerContext);

  const onAddChild = useCallback((language) => {
    api.addInternational(language);
    setTabs((preState) => {
      let newState = [...preState];
      newState.push(
        <Tab key={`tab_${language}`} isAdd={true}>
          {languageNativeNames[language]}
        </Tab>
      );
      return newState;
    });
    setPanel((preState) => {
      let newState = [...preState];
      newState.push(
        <Panel key={`panel_${language}`}>
          {block.map((fieldsBlock, fieldsBlockIndex) => {
            return (
              <div className="row" key={fieldsBlockIndex}>
                {fieldsBlock.map(
                  ({ name, size, fieldSchema, metadatas }, fieldIndex) => {
                    const isComponent = fieldSchema.type === "component";
                    name = `${name}__${language}`;

                    if (isComponent) {
                      const {
                        component,
                        max,
                        min,
                        repeatable = false,
                      } = fieldSchema;
                      const componentUid = fieldSchema.component;

                      return (
                        <Fieldcomponentcreate
                          locale={language}
                          key={componentUid}
                          componentUid={component}
                          isRepeatable={repeatable}
                          label={metadatas.label}
                          max={max}
                          min={min}
                          name={name}
                        />
                      );
                    }
                    return (
                      <div className={`col-${size}`} key={name}>
                        <InputCreate
                          autoFocus={
                            blockIndex === 0 &&
                            fieldsBlockIndex === 0 &&
                            fieldIndex === 0
                          }
                          fieldSchema={fieldSchema}
                          keys={name}
                          metadatas={metadatas}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </Panel>
      );
      return newState;
    });
  }, []);

  return (
    <ParentComponent addChild={onAddChild} onInitEditView={onInitEditView}>
      {compTabs}
      {compPanels}
    </ParentComponent>
  );
};

export default wrapcreate;
