/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useCallback, useState } from "react";
import classnames from "classnames";
import { useHistory } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const Search = props => {
  const initialized = useRef(false);
  const searchBarRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();
  const { siteConfig = {} } = useDocusaurusContext();
  const { baseUrl } = siteConfig;

  // Use provided toggle handler or fallback to local state
  const handleSearchBarToggle = useCallback(
    expanded => {
      if (props.handleSearchBarToggle) {
        props.handleSearchBarToggle(expanded);
      } else {
        setIsExpanded(expanded);
      }
    },
    [props.handleSearchBarToggle]
  );

  const toggleSearchIconClick = useCallback(
    e => {
      if (!searchBarRef.current.contains(e.target)) {
        searchBarRef.current.focus();
      }
      handleSearchBarToggle(!props.isSearchBarExpanded);
    },
    [handleSearchBarToggle, props.isSearchBarExpanded]
  );

  // Use provided expanded state or fallback to local state
  const isSearchBarExpanded = props.isSearchBarExpanded ?? isExpanded;

  const initAlgolia = (searchDocs, searchIndex, DocSearch) => {
      new DocSearch({
        searchDocs,
        searchIndex,
        inputSelector: "#search_input_react",
        // Override algolia's default selection event, allowing us to do client-side
        // navigation and avoiding a full page refresh.
        handleSelected: (_input, _event, suggestion) => {
          const url = baseUrl + suggestion.url;
          // Use an anchor tag to parse the absolute url into a relative url
          // Alternatively, we can use new URL(suggestion.url) but its not supported in IE
          const a = document.createElement("a");
          a.href = url;
          // Algolia use closest parent element id #__docusaurus when a h1 page title does not have an id
          // So, we can safely remove it. See https://github.com/facebook/docusaurus/issues/1828 for more details.

          history.push(url);
        }
      });
  };

  const getSearchDoc = () =>
    process.env.NODE_ENV === "production"
      ? fetch(`${baseUrl}search-doc.json`).then((content) => content.json())
      : Promise.resolve([]);

  const getLunrIndex = () =>
    process.env.NODE_ENV === "production"
      ? fetch(`${baseUrl}lunr-index.json`).then((content) => content.json())
      : Promise.resolve([]);

  const loadAlgolia = () => {
    if (!initialized.current) {
      Promise.all([
        getSearchDoc().catch(() => []),
        getLunrIndex().catch(() => ({})),
        import("./lib/DocSearch"),
        import("./algolia.css")
      ]).then(([searchDocs, searchIndex, { default: DocSearch }]) => {
        if (Array.isArray(searchDocs) && searchDocs.length > 0 && searchIndex) {
          try {
            initAlgolia(searchDocs, searchIndex, DocSearch);
          } catch {
          }
        }
      }).catch(() => {
      });
      initialized.current = true;
    }
  };

  return (
    <div className="navbar__search" key="search-box">
      <span
        aria-label="expand searchbar"
        role="button"
        className={classnames("search-icon", {
          "search-icon-hidden": isSearchBarExpanded
        })}
        onClick={toggleSearchIconClick}
        onKeyDown={toggleSearchIconClick}
        tabIndex={0}
      />
      <input
        id="search_input_react"
        type="search"
        placeholder="Search"
        aria-label="Search"
        className={classnames(
          "navbar__search-input",
          { "search-bar-expanded": isSearchBarExpanded },
          { "search-bar": !isSearchBarExpanded }
        )}
        onClick={loadAlgolia}
        onMouseOver={loadAlgolia}
        onFocus={() => handleSearchBarToggle(true)}
        onBlur={() => handleSearchBarToggle(false)}
        ref={searchBarRef}
      />
    </div>
  );
};

export default Search;
