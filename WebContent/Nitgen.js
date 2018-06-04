var uri = "http://localhost:8003/bioenable/";
//var uri = "http://localhost:8000/SGIFPCapture/";


function GetNitgenInfo() {
    return GetNitgenClient("info");
}
function CaptureFinger(quality, timeout)
{
    var NitgenRequest = {
        "Quality": quality,
        "TimeOut": timeout
    };
    var jsondata = JSON.stringify(NitgenRequest);
    return PostNitgenClient("capture", jsondata);
}
function PostNitgenClient(method, jsonData) {
    var res;
    var httpStaus = false;
    $.ajax({
        type: "POST",
        async: false,
        url: uri + method,
        contentType: "application/json; charset=utf-8",
        data: jsonData,
        dataType: "json",
        processData: false,
        success: function (data) {
            httpStaus = true;
            res = { httpStaus: httpStaus, data: data };
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return res;
}
function GetNitgenClient(method) {
    var res;
    var httpStaus = false;
    $.ajax({
        type: "GET",
        async: false,
        url: uri + method,
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (data) {
            httpStaus = true;
            res = { httpStaus: httpStaus, data: data };
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return res;
}
function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
        err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
        err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
        err = 'Internal Server Error';
    } else if (thrownError === 'parsererror') {
        err = 'Requested JSON parse failed';
    } else if (thrownError === 'timeout') {
        err = 'Time out error';
    } else if (thrownError === 'abort') {
        err = 'Ajax request aborted';
    } else {
        err = 'Unhandled Error';
    }
    return err;
}


/////////// Classes

function Biometric(BioType, BiometricData, Pos) {
    this.BioType = BioType;
    this.BiometricData = BiometricData;
    this.Pos = Pos;
}

function NitgenRequest(BiometricArray) {
    this.Biometrics = BiometricArray;
}