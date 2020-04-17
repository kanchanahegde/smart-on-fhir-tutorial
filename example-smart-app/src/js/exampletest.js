(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        var pt = patient.read();

          if (typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given.join(' ') || 'test';
            lname = patient.name[0].family.join(' ') || 'last';
          }
          var p = defaultPatient();
          p.fname = fname;
          p.lname = lname;

          ret.resolve(p);
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onReady, onError);
    return ret.promise();

  };

  function defaultPatient(){
    return {
      fname: {value: ''},
      lname: {value: ''}
    };
  }

  window.drawVisualization = function(p) {
    $('#fname').html(p.fname);
    $('#lname').html(p.lname);
  };

})(window);
