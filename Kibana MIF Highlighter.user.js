// ==UserScript==
// @name         Kibana MIF Highlighter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes MIF dashboard monitoring a little easier
// @author       You
// @match        https://gms-prod-kibana.logistics.com/s/cloudops/app/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

var hostnames;
var MIFlinks;
var obj = {};
var tds = [];


setVars();


if (!document.URL.includes("https://gms-prod-kibana.logistics.com/s/cloudops/app/canvas#/workpad/workpad-1641f249-90d4-4a4f-8209-3e6e5c78fa2a/page/1")) {
    throw("Not the right page");
}


(function () {
    (function loop() {
        beautify();
        setTimeout(loop, 5000);
    }());
})();




function beautify() {
    for(td of document.querySelectorAll("td:nth-child(2)")){ // Loop through all HOSTNAME cells
        if (obj[td.innerText] === undefined && td.innerText != "DB1_2021_PROD_MIF_matm-mif-prd-01_us-east1_matm-prod") { //If there was no kv pair found, set color to red. Excludes MATM because it's a false entry
            td.style.color = "rgb(255, 0, 0)"; //Set the color to red
        } else { //If a KV pair WAS found for the hostname
            td.innerHTML = "<a href='" + obj[td.innerText] + "' style='color:white;' target='_blank'>" + td.innerText + "</a>"; //Inject the appropriate link into the text
            td.style.color = "rgb(255, 255, 255)"; //Set the color to red
        }
    }


    for(td of document.querySelectorAll("td:nth-child(6)")){ // Loop through all COUNT cells
        if (parseInt(td.innerText) >= 100) { //If the message count is greater than 100
            td.style.fontWeight = "bold"; //Set the text to bold
            td.style.color = "rgb(255, 0, 0)"; //Set the color to red
        } else {
            td.style.fontWeight = "normal"; //Return the text to normal
            td.style.color = "rgb(255, 255, 255)"; //Set the color to white

        }
    }

    for(td of document.querySelectorAll("td:nth-child(7)")){ //Loop through all RESULT DESC cells
        if (td.innerText != "Sending message to destination failed" && td.innerText != "Destination system processed message with application exception") { //If the test isnt Message fail or app exception:
            td.style.color = "rgb(130, 130, 130)"; //Set the color to gray since it's not as important
        } else {
            td.style.color = "rgb(255, 255, 255)"; //Set the color to white. Necessary because when the text updates the gray is moved to the wrong entry.
        }
    }
}

function setVars() {
    hostnames = [
        "DB_AWS_AOMIF_ec2-52-70-151-245_compute-1_amazonaws_com",
        "DB1_MIF_USA_cotn-usa-prod1.pdb2.manhvcn.oraclevcn.com",
        "DB2_MIF_USA_cotn-usa-prod2.pdb2.manhvcn.oraclevcn.com",
        "DB1_MIF_RSA_cotn-rsa-prod1.pdb2.manhvcn2.oraclevcn.com",
        "DB1_MIF_AU_cotn-au-prod1.pdb.manhvcn.oraclevcn.com",
        "DB2_MIF_AU_cotn-au-prod2.pdb.manhvcn.oraclevcn.com",
        "DB2_MIF_RSA_cotn-rsa-prod2.pdb2.manhvcn2.oraclevcn.com",
        "DB1_MIF_EMEA_cotn-prod-emea1.pdb.manhvcn.oraclevcn.com",
        "DB1_MIF_ctclprim.dbsubad1.ctclvcn.oraclevcn.com",
        "DB1_MIF_PROD_EOM_eomweb1.ma-prd.containerstore.com",
        "DB1_PROD_MIF_dsgn-mif-prd-01_us-central1_dsgn-prod",
        "DB1_PROD_MIF_expd-prod-db.logistics.com",
        "DB1_PROD_MIF_gbar-mif-prd-01_us-central1_gbar-prd",
        "DB1_GDYN_AOMIF_gdyn-mif-prd-01:us-central1:gdyn-prd-01",
        "PROD_DB1_MIF_louiprim.dbsubad1.louivcn.oraclevcn.com",
        "DB1_PROD_MIF_mkor-mif-prd-01.us-east1.mkor-prd",
        "DB1_PROD_MIF_ndcp-prod.dbsubad1.ndcpvcn.oraclevcn.com",
        "DB1_PROD_MIF_orvs-mif-prd-01.us-west1.orvs-prd",
        "DB1_PROD_MIF_raia-mif-prd-01_us-east1_raia-prod",
        "DB1_PROD_MIF_shoe-prod.db1.manhvcn.oraclevcn.com",
        "DB1_PROD_MIF_tchp-prod.dbsubad1.tchpvcn.oraclevcn.com",
        "DB1_MIF_PROD_tchpprim.dbsubad1.tchpvcn.oraclevcn.com",
        "DB1_PROD_MIF_vip-mhnp5.foreverdirect.local",
        "DB1_PROD_MIF_ulmi-prod.db1.manhvcn.oraclevcn.com",
        "DB1_Astrolab1_MIF_NEW_maa1p1dbp1.dbaasprd1.astroprd.oraclevcn.com",
        "DB1_PRIMARY_MIF_utec.dbsubad1.utecvcn.oraclevcn.com",
        "DB1_PROD_MIF_uwrl-prod.dbad1.uwrlvcn.oraclevcn.com",
        "DB1_SAAS_MIF_vabc-mif-prd-01.us-central1.vabc-prd",
        "DB1_PROD_MIF_stsh-mif-prd-01:us-east1:stsh-prod",
        "DB1_MIF_ASIA_cotn-asia-prod1.pdb2.manhvcn.oraclevcn.com",
        "DB1_PROD_MIF_usdatmaprdb1.global.lpl.top",
        "DB1_PROD_MIF_exon-mif-prd-01_us-central1_exon-prd",
        "DB1_PROD_MIF_odmx-mif-prd-01:us-east1:odmx-prod",
        "DB1_OLEN_TEMSE_UBDD_PROD_MIF_bctnprimfrk.dbsubad2.bctnvcn.oraclevcn.com",
        "DB2_MIF_ASIA_cotn-asia-prod2.pdb2.manhvcn.oraclevcn.com",
        "DB1_efc2_PROD_MIF_klds-efc2-prod.db1.manhp.oraclevcn.com",
        "DB1_FO_PROD_MIF_bctn-prod.dbsubad1.bctnvcn.oraclevcn.com",
        "DB1_PROD_MIF_bbab-mif-prd-01",
        "DB1_PF_PROD_MIF_bctn-prod.dbsubad1.bctnvcn.oraclevcn.com",
        "DB1_PROD_MIF_math-prod.dbsubad1.mathvcn.oraclevcn.com",
        "DB1_WH20_PROD_MIF_puma-wh20-prod.dbsubad2.pumavcn.oraclevcn.com",
        "DB1_DC80_PROD_MIF_rtad-dc80-prod.dbsubad1.rtadvcn.oraclevcn.com",
        "DB1_PROD_MIF_tata-mif-prd-01:southamerica-east1:tata-prod-mif-db",
        "DB1_PROD_MIF_uarm-mif-prd-01_us-east1_uarm-prod",
        "DB1_PROD_AOMIF_lobl-mif-prd-01.us-central1.lobl",
        "DB1_PROD_MIF_pari-mif-prd-01_us-east1_pari-prod1",
        "DB1_PROD_MIF_twgl-mif-prd-01.australia-southeast1.twgl-prd",
        "DB1_Bobigny_PROD_MIF_frselopsqloda10.atlas.hermes",
        "DB1_RD_PROD_MIF_bctn-rd-prod.dbsubad1.bctnvcn.oraclevcn.com",
        "DB1_PROD_MIF_exit-mif-prd-01:us-central1:exit-prod",
        "DB1_PROD_MIF_home-prod.dbsubad1.homevcn.oraclevcn.com",
        "DB1_PROD_MIF_dbli-mif-prd-01_us-central1_dbli",
        "DB1_FTRM_PROD_MIF_masrpp2dbp01.subprdad1back.vcnprd.oraclevcn.com",
        "DB1_PROD_MIF_psun-mif-prd-01_us-west1_psun-prd"];



    MIFlinks = [
        "https://cagop.mif.manh.com/web/ILS/ILSHelpers/main.jsp",
        "https://cotn-mif-prod-usa.prod.cottonon.com/web/ILS/ILSHelpers/main.jsp",
        "https://cotn-mif-prod-usa.prod.cottonon.com/web/ILS/ILSHelpers/main.jsp",
        "https://cotn-mif-prod-rsa.prod.cottonon.com/web/ILS/ILSHelpers/main.jsp",
        "http://prod-au-mif1.papps1.manhvcn.oraclevcn.com:5555/web/ILS/ILSHelpers/main.jsp",
        "http://prod-au-mif1.papps1.manhvcn.oraclevcn.com:5555/web/ILS/ILSHelpers/main.jsp",
        "https://cotn-mif-prod-rsa.prod.cottonon.com/web/ILS/ILSHelpers/main.jsp",
        "https://cotn-mif-prod-emea.prod.cottonon.com/web/ILS/ILSHelpers/main.jsp",
        "https://fcgy-mif-prod.corp.ad.ctc:8074/ILS/ILSHelpers/main.jsp",
        "http://mif1.ma-prd.containerstore.com:5555/web/ILS/ILSHelpers/main.jsp",
        "https://dsgn-prod-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://expd-prod-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://gbar-prod-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://gdyn-prd-mif.logistics.com:8074/ILS/ILSHelpers/main.jsp",
        "https://loui-mif-prod.logistics.com/web/ILS/ILSHelpers/main.jsp",
        "https://mkor-prd-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "http://ndcp-prod-mif-vm1.appsubad1.ndcpvcn.oraclevcn.com:5555/web/ILS/ILSHelpers/main.jsp",
        "https://orvs-mif-gcp-prd.orvis.com/ILS/ILSHelpers/main.jsp",
        "https://raia-mif-prd1-vm.us-east1-c.c.raia-mif-prd-01.internal/ILS/ILSHelpers/main.jsp",
        "https://scvl-mif-prod.scvl.com:8074/ILS/ILSHelpers/main.jsp",
        "https://eom-mif-prod-tcphq.logistics.com/web/ILS/ILSHelpers/main.jsp",
        "https://eom-mif-prod-tcphq.logistics.com/web/ILS/ILSHelpers/main.jsp",
        "http://10.22.208.237:5555/web/ILS/ILSHelpers/main.jsp",
        "https://ulmit-mif-prd.logistics.com/web/ILS/ILSHelpers/main.jsp",
        "https://wms-mif-ftrm.showroomprive.com/web/ILS/ILSHelpers/main.jsp",
        "http://utec-prod-mif-vm1.appsubad1.utecvcn.oraclevcn.com:8072/ILS/ILSHelpers/main.jsp",
        "https://uwrl-mif-prod.logistics.com:8074/ILS/ILSHelpers/main.jsp",
        "https://vabc-prd-mif.logistics.com:8074/ILS/ILSHelpers/main.jsp",
        "https://stsh-prod-mif.logistics.com:8074/ILS/ILSHelpers/main.jsp",
        "https://cotn-mif-prod-asia.prod.cottonon.com/web/ILS/ILSHelpers/main.jsp#",
        "http://10.108.108.66:8888/web/ILS/ILSHelpers/main.jsp",
        "https://iwmprod-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://odmx-prod-mif.logistics.com:8074/ILS/ILSHelpers/main.jsp",
        "https://mif-prod.emeaprodmanh.bdx.com:8074/ILS/index.html",
        "https://cotn-mif-prod-asia.prod.cottonon.com/web/ILS/ILSHelpers/main.jsp#",
        "http://klds-prod-mif1-efc2.apps1.manhp.oraclevcn.com:5555/web/ILS/ILSHelpers/main.jsp",
        "https://bctn-mif.usprodmanh.bdx.com:8074/ILS/ILSHelpers/main.jsp",
        "https://bbab-prod-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://bctn-mif.usprodmanh.bdx.com:8074/ILS/ILSHelpers/main.jsp",
        "https://math-prod-mif.mppa.co.id/web/ILS/ILSHelpers/main.jsp",
        "https://mif.pna-wh20.mypuma.net/web/ILS/ILSHelpers/main.jsp",
        "https://dc80mif.riteaid.com:8074/ILS/ILSHelpers/main.jsp",
        "https://tata-prd-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://uarm-prod-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://lobl-prd-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://pari-prod-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://twgl-prod-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "http://frsellpappman03.atlas.hermes:5555/web/ILS/ILSHelpers/main.jsp",
        "https://bctn-rd-mif.usprodmanh.bdx.com:8074/ILS/ILSHelpers/main.jsp",
        "https://exit-prod-mif.logistics.com:8074/ILS/ILSHelpers/main.jsp",
        "https://home-prod-mif-vm1.appsubad1.homevcn.oraclevcn.com:8074/ILS/ILSHelpers/main.jsp",
        "https://dbli-prd-mif.logistics.com/ILS/ILSHelpers/main.jsp",
        "https://wms-mif-ftrm.showroomprive.com/web/ILS/ILSHelpers/main.jsp",
        "https://psun-prod-mif.logistics.com/ILS/ILSHelpers/main.jsp"];

    for(var i = 0; i < hostnames.length; i++){
        obj[hostnames[i]] = MIFlinks[i];
    }

}



