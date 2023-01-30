// ==UserScript==
// @name         MIF dashboard helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match      *://*/ILS/Filter/TranLogList.jsp?objectType=TRANLOG
// @match      *://*/web/ILS/Filter/TranLogList.jsp?objectType=TRANLOG
// @match      *://*/web/ILS/Filter/TranLogList.jsp
// @match      *://*/ILS/Filter/TranLogList.jsp
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button" style="padding: 0px 8px;cursor:hand;" class="btnsml" >'
                + ' Application Exception </button>'
                + "&nbsp;"
                + '<button id="myButton2" type="button" style="padding: 0px 8px;cursor:hand" class="btnsml">'
                + ' Message Failed </button><br><br>'
                + '<button id="myButton3" type="button" style="padding: 0px 8px;cursor:hand" class="btnsml">'
                + ' Select all and resend </button>'
;




zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ApplicationException, false
);

document.getElementById ("myButton2").addEventListener (
    "click", MessageFailed, false
);

document.getElementById ("myButton3").addEventListener (
    "click", SelectAllAndResend, false
);

function ApplicationException (zEvent) {
    document.getElementById("fromDate").value = 'Last Twenty-Four Hours';
    document.getElementById("fromDate_menu").value = 'Last Twenty-Four Hours';
    document.getElementById("toDate").value = 'Now';
    document.getElementById("toDate_menu").value = 'Now';
    document.getElementById("resultCode").value = '503';
    document.getElementById("myButton").innerText = "Loading...";
    applyFilter();
    return;
}

function MessageFailed (zEvent) {
    document.getElementById("fromDate").value = 'Last Twenty-Four Hours';
    document.getElementById("fromDate_menu").value = 'Last Twenty-Four Hours';
    document.getElementById("toDate").value = 'Now';
    document.getElementById("toDate_menu").value = 'Now';
    document.getElementById("resultCode").value = '24';
    document.getElementById("myButton2").innerText = "Loading...";
    applyFilter();
    return;
}

function SelectAllAndResend (zEvent) {
    if (document.getElementById("selectedResend") == null) {
        alert("There is nothing to resend");
        return
    }

    if (!document.getElementById("checkAll").checked) { //If the CheckAll is already checked, dont select it again
        document.getElementById("checkAll").click();
    }

    document.getElementById("myButton3").innerText = "Loading...";
    callResend('submitForm','no');
    return;
}

//--- Style our newly added elements using CSS.
