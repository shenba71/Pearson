import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

declare var visualize: any;
declare var $ :any;
@Component({
  selector: 'app-drilldown-report',
  templateUrl: './drilldown-report.component.html',
  styleUrls: ['./drilldown-report.component.scss']
})
export class DrilldownReportComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { 
    if (!this.authenticationService.currentUserValue) { 
      this.router.navigateByUrl('/login');
  }
  }

  ngOnInit() {
    this.loadDrillDownChart();
  }

  loadDrillDownChart() {  
    //var firstView = "/adhoc/aru/DrillDownParentView";
    var firstView = "/public/AdHocViews/ProductsView";
  
  visualize({
    auth: {
      name: "jasperadmin",
      password: "jasperadmin"
    }
  }, function(v) {
    function renderView() {
      $("#backButton").hide();      
      var first = v.adhocView({
        resource: firstView,
        container: "#firstContainer",
        linkOptions: {
          events: {
            click: function(ev, data, defaultHandler, extendedData) {
              console.log(data);
              console.log('data measure is '+ data.Measures);
             // console.log('data is '+ data["REPORT_TEST_USERSESSIONS.USERID"]);
              var measureSelected = data.Measures;
              //var userid = data["REPORT_TEST_USERSESSIONS.USERID"];
              var productName = data["REPORT_TEST_PRODUCT_DETAILS_ARRAY.NAME"];
              $("#field").html("<span>Field: <b>" + data["REPORT_TEST_PRODUCT_DETAILS_ARRAY.NAME"] + "</b></span>") 
            var params = {       
              ["NAME_1"]: [productName]               
             };
              updateView(productName, params, null)
            }
          }
        },
        success: function() {
          console.log("Available filters")
          console.log(first.data().metadata.inputParameters);
        },
        error: function(e) {
          console.log(e);
        }
      });
    }
    
    renderView()
    
    function updateView(productName, params, view) {
      //var showCostView = "/adhoc/aru/DrillDownChildView";
      var showChildView = null;
      if(view === null) {
        showChildView = "/public/AdHocViews/ProductLimitsView";
      } else {
        showChildView = view;
      }

      $("#backButton").show();      
        
        var costView = v.adhocView({
          resource: showChildView,
          container: "#firstContainer",
          params: params,
          linkOptions: {
            events: {
              click: function(ev, data, defaultHandler, extendedData) {
                console.log(data);
                console.log('data measure is '+ data.Measures);
               // console.log('data is '+ data["REPORT_TEST_USERSESSIONS.USERID"]);
                var limitType = data["REPORT_TEST_PRODUCT_DETAILS_ARRAY_LIMITS.LIMITTYPE"];
                // No more drilling down if the parameter is undefined
                if (typeof limitType === 'undefined') { 
                  return;
                }
                console.log('productName is '+productName + ' limit type is '+ limitType);
                (<HTMLInputElement>document.getElementById('hiddenProductName')).value = productName;                
                (<HTMLInputElement>document.getElementById('hiddenView')).value = showChildView;                 
                var params = {       
                  ["NAME_1"]: [productName],
                  ["LIMITTYPE_1"]: [limitType],               
                 };
                $("#field").html("<span>Field: <b>" + data["REPORT_TEST_PRODUCT_DETAILS_ARRAY_LIMITS.LIMITTYPE"] + "</b></span>");   
                updateView(productName, params, '/public/AdHocViews/ProductLimitsDetailView')
              }
            }
          },
          error: function(e) {
            console.log(e);
          }
        });
        
    }
    
    function goBack() {
      $("input[name='goBack']").click(doIt);
      
      function doIt() {
        var hiddenProductName = (<HTMLInputElement>document.getElementById('hiddenProductName')).value;
        var hiddenView = (<HTMLInputElement>document.getElementById('hiddenView')).value;
        var params = {       
          ["NAME_1"]: [hiddenProductName]               
         };
         if (hiddenProductName !== '') { 
          (<HTMLInputElement>document.getElementById('hiddenProductName')).value = '';                
          (<HTMLInputElement>document.getElementById('hiddenView')).value = '';
          updateView(hiddenProductName, params, hiddenView);
          $("#field").html("<span>Field: <b>" + hiddenProductName + "</b></span>") 
        } else {
          renderView()
          $("#field").html("") 
        }
      } 
    } 
    
    goBack()
  });
    
    
    }

}
