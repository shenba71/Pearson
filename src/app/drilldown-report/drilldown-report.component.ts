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
  
    var firstView = "/adhoc/aru/DrillDownParentView";
  
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
              console.log('data is '+ data["REPORT_TEST_USERSESSIONS.USERID"]);
              var measureSelected = data.Measures;
              var userid = data["REPORT_TEST_USERSESSIONS.USERID"];
              $("#field").html("<span>Field: <b>" + data["REPORT_TEST_USERSESSIONS.USERID"] + "</b></span>") 
  
              updateView(measureSelected, userid)
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
    
    function updateView(measure, userId) {
      var showCostView = "/adhoc/aru/DrillDownChildView";
      
      $("#backButton").show();
  
      
        $("#measure").html("<span>Measure: <b>userId</b></span>")
        var costView = v.adhocView({
          resource: showCostView,
          container: "#firstContainer",
          params: {
            ["USERID_1"]: [userId]
          },
          error: function(e) {
            console.log(e);
          }
        });
        
    }
    
    function goBack() {
      $("input[name='goBack']").click(doIt);
      
      function doIt() {
        renderView()
      } 
    } 
    
    goBack()
  });
    
    
    }

}
