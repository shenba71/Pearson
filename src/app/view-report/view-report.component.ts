import { Component, OnInit } from '@angular/core';

declare var visualize: any;
declare var $ :any;
@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  this.initializeJasper();
  }
  
  initializeJasper(){
  visualize({
  auth: {
    name: "jasperadmin",
    password: "jasperadmin"

  }
}, function(v) {
  var adv = v.adhocView({
    resource: "/adhoc/aru/MongoLoginView",
    //resource: "/public/AdHocViews/MongoLoginView",
    container: "#container",
  });

  //render initial view
  setInitialType();

  function setInitialType() {
    adv.canvas({
      type: $("#selected_resource").val()
    }).run().fail(handleError);
  }

  $("#selected_resource").change(function() {
    adv.canvas({
      type: $("#selected_resource").val()
    }).run().fail(handleError);
  });

  function handleError(err) {
    console.log(err);
  }

  $('#selected_resource').prop('disabled', false);

});
  
  }

}
