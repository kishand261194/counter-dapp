App = {
    web3: null,
    contracts: {},
    //development
    url:'http://127.0.0.1:7545',
    network_id:5777,
    handler:null,
    value:1000000000000000000,
    index:0,
    margin:10,
    left:15,
    init: function() {
      return App.initWeb3();
    },

    initWeb3: function() {
      if (typeof web3 !== 'undefined') {
        App.web3 = new Web3(Web3.givenProvider);
      } else {
        App.web3 = new Web3(App.url);
      }
      ethereum.enable();
      return App.initContract();
    },

    initContract: function() {
      $.getJSON('Counter.json', function(data) {
        App.contracts.Counter = new App.web3.eth.Contract(data.abi, data.networks[App.network_id].address, {});
      })

      return App.bindEvents();
    },

    bindEvents: function() {
      $(document).on('click', '#initilaizeCounter', function(){
         App.handleInitialization(jQuery('#Initialize').val());
      });

      $(document).on('click', '#getCounter', function(){
        App.handleGet();
      });
      $(document).on('click', '#incrementCounter',function(){
        App.handleIncrement(jQuery('#Increment').val());
      });
      $(document).on('click', '#decrementCounter', function(){
        App.handleDecrement(jQuery('#Decrement').val());
      });
      App.populateAddress();
    },

    populateAddress : function(){

        new Web3(App.url).eth.getAccounts((err, accounts) => {
          if(!err){
            App.handler=accounts[0];
        }else{
            console.log('Something went wrong');
            }
          });
    },

    handleInitialization:function(counterValue){
      if (counterValue===''){
        alert("Please enter a valid initializing value.")
        return false
      }
      var option={from:App.handler}
      App.contracts.Counter.methods.initialize(counterValue)
      .send(option)
      .on('receipt',(receipt)=>{
        if(receipt.status){
          toastr.success("Counter is set to " + counterValue);
      }})

    },

    handleGet:function(){
      App.contracts.Counter.methods.get()
      .call()
      .then((r)=>{
        jQuery('#counter_value').text(r)
      })
    },


    handleIncrement:function(incrementValue){
      if (incrementValue===''){
        alert("Please enter a valid incrementing value.")
        return false
      }
      var option={from:App.handler}
      App.contracts.Counter.methods.increment(incrementValue)
      .send(option)
      .on('receipt',(receipt)=>{
        console.log(receipt);
        if(receipt.status){
          toastr.success("Counter is incremented by " + incrementValue);
      }})
    },

    handleDecrement:function(decrementValue){
      if (decrementValue===''){
        alert("Please enter a valid decrementing value.")
        return false
      }
      console.log(decrementValue);
      var option={from:App.handler}
      App.contracts.Counter.methods.decrement(decrementValue)
      .send(option)
      .on('receipt',(receipt)=>{
        if(receipt.status){
          toastr.success("Counter is decremented by " + decrementValue);
      }})
    },

  }

  $(function() {
    $(window).load(function() {
      App.init();
      toastr.options = {
        // toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-bottom-full-width",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        // }
      };
    });
  });
