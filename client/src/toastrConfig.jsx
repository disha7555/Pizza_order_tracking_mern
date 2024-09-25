//import React from 'react'
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
function toastrConfig() {

       toastr.options = {
          closeButton: true,
          debug: false,
          newestOnTop: false,
          progressBar: false,
          positionClass: "toast-top-right", // You can customize this
          preventDuplicates: true,
          onclick: null,
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "4000", // How long the toast will display
          extendedTimeOut: "1000",
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
      
}

export default toastrConfig;
