(function() {

    /* krew-alerts
      Methods:
          .success - extends createAlert with type = 'success'
          .info - extends createAlert with type = 'info'
          .warn - extends createAlert with type = 'warn'
          .error  - extends createAlert with type = 'error'

      Params: *** all methods accept the same params ***
         message:[String],
         options:[{
             autoDismiss:[Number (milliseconds)],
             callback: [function],
             confirm: [Boolean || object {trueText:[String], falseText:[String]
         }]
    */

    var appearClass = ' show-me';

    function KrewAlerts() {
        var _this = this;
        var alerts = [];

        var alertsContainer = document.createElement('DIV');
        alertsContainer.className = 'krew-alert__container';
        document.body.appendChild(alertsContainer);

        var createAlert = function(type,message,options){
            var alertBox = new AlertBox(type,message);
            var dismissTimeout = null;

            options = extendObject({
                autoDismiss:null,
                callback: function(){},
                confirm: null
            },options);

            alertsContainer.appendChild(alertBox.container);
            alertBox.height = alertBox.container.offsetHeight;

            alertBox.closeButton.onclick = dismissAlert;

            if(options.autoDismiss && !isNaN(options.autoDismiss)){
                dismissTimeout = setTimeout(dismissAlert,options.autoDismiss);
            }

            if(options.confirm){
                alertBox.addConfirm(options.confirm);
                alertBox.confirmButtonTrue.onclick = function(){
                    dismissAlert(true);
                };
                alertBox.confirmButtonFalse.onclick = function(){
                    dismissAlert(false);
                };
            }
            alerts.unshift(alertBox);

            if(alertBox.container.className.indexOf(appearClass) < 0){
                // hack to make sure element is added before class is added
                setTimeout(function(){
                    alertBox.container.className = alertBox.container.className + appearClass;
                    updatePosition();
                },100);
            }


            function dismissAlert(confirm){

                alerts.splice(alerts.indexOf(alertBox),1);
                updatePosition();
                alertBox.dismiss();

                setTimeout(function(){
                    alertsContainer.removeChild(alertBox.container);
                    alertBox = null;
                },1000);
                options.callback(confirm);
                clearTimeout(dismissTimeout);
            }
            function updatePosition(){
                var runningHeight = 10;
                alerts.forEach(function(alert,i){
                    alert.container.style.top = runningHeight +'px';
                    runningHeight += alert.height + 10;
                });
            }
            return alertBox;
        }



        this.success = function(message,options){
            return createAlert('success',message,options);
        };
        this.info = function(message,options){
            return createAlert('info',message,options);
        };
        this.warn = function(message,options){
            return createAlert('warn',message,options);
        };
        this.error = function(message,options){
            return createAlert('error',message,options);
        };
    }



    function extendObject(a, b){
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }



    function AlertBox(type,message){

        var container = document.createElement('DIV');
        var textContainer = document.createElement('DIV');
        var closeButton = document.createElement('DIV');
        var icon = document.createElement('DIV');


        textContainer.className = 'krew-message';
        textContainer.innerHTML = message;

        icon.className = 'krew-alert-icon';

        closeButton.className = 'krew-alert__close';

        container.className = 'krew-alert krew-'+type;
        container.appendChild(textContainer);
        container.appendChild(closeButton);
        container.appendChild(icon);

        this.container = container;
        this.closeButton = closeButton;
        this.textContainer = textContainer;
    };

    AlertBox.prototype.updateMessage = function(message){
        this.textContainer.innerHTML = message;
    };

    AlertBox.prototype.dismiss = function(){
        this.container.className = this.container.className.replace(new RegExp(appearClass ,'g'),'');
    };

    AlertBox.prototype.addConfirm = function(confirm){

        var confirmContainer= document.createElement('DIV');
        var confirmButtonTrue = document.createElement('DIV');
        var confirmButtonFalse = document.createElement('DIV');

        confirmButtonTrue.innerHTML = confirm.trueText ? confirm.trueText : 'OK';
        confirmButtonFalse.innerHTML = confirm.falseText ? confirm.falseText : 'Cancel';

        confirmContainer.className = 'krew-confirm__container';
        confirmButtonTrue.className = 'krew-confirm__button krew-confirm__true';
        confirmButtonFalse.className = 'krew-confirm__button krew-confirm__false';

        confirmContainer.appendChild(confirmButtonTrue);
        confirmContainer.appendChild(confirmButtonFalse);

        this.container.className = this.container.className + ' krew-confirm';
        this.container.appendChild(confirmContainer);

        this.confirmButtonTrue = confirmButtonTrue;
        this.confirmButtonFalse = confirmButtonFalse;

    };


    window.KrewAlert = new KrewAlerts();


})();
