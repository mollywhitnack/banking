'use stirct';

let app = angular.module('myApp', [ 'ngStorage']);

console.log("READY");


app.controller('mainCtrl', function($scope, $interval, $localStorage){

  $scope.$storage = $localStorage;

  $scope.transactions = $scope.$storage.transactions || [];
  $scope.$storage.transactions = $scope.transactions;

  
  $scope.sum = $scope.$storage.sum || 0;
  $scope.$storage.sum = $scope.sum;

  $scope.wSum = $scope.$storage.wSum || 0;
  $scope.$storage.wSum = $scope.wSum;

  $scope.dSum = $scope.$storage.dSum || 0;
  $scope.$storage.dSum = $scope.dSum;

  $scope.deposits = $scope.$storage.deposits || 0;
  $scope.$storage.deposits = $scope.deposits;

  $scope.withdrawls = $scope.$storage.withdrawls || 0;
  $scope.$storage.withdrawls = $scope.withdrawls;

  //$scope.deposits = 0;
  //$scope.deposits = 0;
  //$scope.withdrawls = 0;
  /*$scope.wSum = 0;
  $scope.dSum = 0;
  $scope.sum = 0;*/

  $scope.addTransaction = function(){
    if($scope.newTransaction.type == "debit"){
      $scope.withdrawls++;
      $scope.$storage.withdrawls = $scope.withdrawls;
      
      $scope.wSum +=$scope.newTransaction.amount;
      $scope.$storage.wSum = $scope.wSum;
      //$scope.withdrawls.push(Math.abs(parseInt($scope.newTransaction)));
      $scope.newTransaction.amount = (-1)*Math.abs(parseInt($scope.newTransaction.amount));
    }
    else if($scope.newTransaction.type == "credit"){
      $scope.deposits++;
      $scope.$storage.deposits = $scope.deposits;

      $scope.dSum += $scope.newTransaction.amount;
      $scope.$storage.dSum = $scope.dSum;

      $scope.newTransaction.amount = Math.abs(parseInt($scope.newTransaction.amount));
    }
    

    $scope.sum +=$scope.newTransaction.amount;
    $scope.$storage.sum = $scope.sum;

    if( $scope.sum < 0){
       swal({   title: "YOU ARE POOR!",   text: "Yikes....",   imageUrl: "http://www.clipartbest.com/cliparts/xcg/o99/xcgo99Kdi.png" });
    }

    $scope.newTransaction.total = $scope.sum;
    $scope.newTransaction.wTotal = $scope.wSum;
    $scope.newTransaction.dTotal = $scope.dSum;

    console.log("$scope: ", $scope.newTransaction);
    $scope.transactions.push($scope.newTransaction);
    $scope.newTransaction = '';

  }

  $scope.deleteTransaction = function(ind){

     //console.log("type: ", $scope.transactions[ind].amount);
    if($scope.transactions[ind].type == "debit"){
      $scope.withdrawls--;
      console.log("debit subtract: ", $scope.transactions[ind].amount);
      $scope.sum += (Math.abs(parseInt($scope.transactions[ind].amount)));
      $scope.$storage.sum = $scope.sum;
      $scope.wSum += (Math.abs(parseInt($scope.transactions[ind].amount)))
      $scope.$storage.wSum = $scope.wSum;
    }
    else if($scope.transactions[ind].type == "credit"){
      $scope.deposits--;
      console.log("credit add: ", $scope.transactions[ind].amount);
      $scope.sum += (-1)*Math.abs(parseInt($scope.transactions[ind].amount));
      $scope.$storage.sum = $scope.sum;
      $scope.dSum += (-1)*(Math.abs(parseInt($scope.transactions[ind].amount)))
      $scope.$storage.dSum = $scope.dSum;

    }
    //$scope.sum += $scope.transactions[ind].amount;
    console.log("sum after delete: ", $scope.sum );
    //$scope.amounts.splice(ind,1);
    $scope.transactions.splice(ind,1);
  }
});


/*function getTotal(){

  console.log("trans: ", $scope.transactions);
  for(var i =0; i<$scope.transactions.length; i++){
    total += parseInt($scope.transactions[i].amount);
  }
  return total;
}*/
