/*
 *
 * LanguageToggle
 *
 */

import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { languages, languageNativeNames } from "../../i18n";
import Wrapper from "./Wrapper";
import EditViewDataManagerContext from "../../../contexts/EditViewDataManager";

export class LocaleToggle extends React.Component {
  // eslint-disable-line
  state = { isOpen: false, locale: "select" };
  toggle = () => this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  render() {
    // const {
    //   currentLocale: { locale },
    //   className,
    // } = this.props;
    const className = "toggle";
    // const changeLocale = this.props.changeLocale;
    const style = cn("localeDropdownMenu", className);
    // const api = useContext(EditViewDataManagerContext);
    return (
      <Wrapper>
        <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle className="localeDropdownContent">
            <span>{languageNativeNames[this.state.locale]}</span>
          </DropdownToggle>

          <DropdownMenu className={style}>
            {languages.map((language) => (
              <DropdownItem
                key={language}
                onClick={() => {
                  this.props.changeLocale(language);
                }}
                className={cn(
                  "localeToggleItem",
                  this.state.locale === language ? "localeToggleItemActive" : ""
                )}
              >
                {languageNativeNames[language]}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
      </Wrapper>
    );
  }
}

// LocaleToggle.defaultProps = {
//   className: null,
// };

// LocaleToggle.propTypes = {
//   className: PropTypes.string,
//   changeLocale: PropTypes.func.isRequired,
//   currentLocale: PropTypes.object.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   currentLocale: makeSelectLocale(),
// });

// export function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       changeLocale,
//     },
//     dispatch
//   );
// }

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export default compose(withConnect)(LocaleToggle);
export default LocaleToggle;
