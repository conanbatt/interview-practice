// Provider for the `useServerInsertedHTML` API to register callbacks to insert
// elements into the HTML stream.
import React from "react";
import { ServerInsertedHTMLContext } from "../../shared/lib/server-inserted-html";
export function createServerInsertedHTML() {
    const serverInsertedHTMLCallbacks = [];
    const addInsertedHtml = (handler)=>{
        serverInsertedHTMLCallbacks.push(handler);
    };
    return {
        ServerInsertedHTMLProvider ({ children  }) {
            return /*#__PURE__*/ React.createElement(ServerInsertedHTMLContext.Provider, {
                value: addInsertedHtml
            }, children);
        },
        renderServerInsertedHTML () {
            return serverInsertedHTMLCallbacks.map((callback, index)=>/*#__PURE__*/ React.createElement(React.Fragment, {
                    key: "__next_server_inserted__" + index
                }, callback()));
        }
    };
}

//# sourceMappingURL=server-inserted-html.js.map