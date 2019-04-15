App = {
    clientId: 'Pfpww84_GYnlGpqfyeJmAbXL9mk3s2ItUG0jbbp96lM',
    clientSecret: 'w7uKNRyIAWri/Ubem1pLinjgRrWyWLNcvD4jzEa03A1ZlZP79abYGB9/IOVvHHG',
    authURL: 'https://api.block.mason.link/oauth2/token',
    baseURL: 'https://api.block.mason.link/v1/',
    web3Provider: null,
  
    init: function() {
      // Load stamps.
      $.getJSON('../stamps.json', function(data) {
        const stampsRow = $('#stampsRow');
        const stampTemplate = $('#stampTemplate');
  
        for (i = 0; i < data.length; i ++) {
          stampTemplate.find('.panel-title').text(data[i].name);
          stampTemplate.find('img').attr('src', data[i].picture);
          stampTemplate.find('.stamp-fact').text(data[i].fact);
          stampTemplate.find('.btn-own').attr('data-id', data[i].id);
  
          stampsRow.append(stampTemplate.html());
        }
        return App.markOwned();
      });
      return App.initWeb3();
    },
  
    initWeb3: function() {
      if (typeof web3.currentProvider.selectedAddress !== 'undefined') {
        // If a web3 provider exists
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } 
      else {
        // Specify default instance if no web3 provider
        App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        web3 = new Web3(App.web3Provider);
      }
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '.btn-own', App.handleOwn);
    },
  
    accessToken: async function() {
      const authBody = {
        "grant_type": "client_credentials",
        "client_id": App.clientId,
        "client_secret": App.clientSecret
      }
  
      const tokenResponse = await fetch(App.authURL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authBody),
      });
  
      const tokenData = await tokenResponse.json();
      console.log(tokenData);
      return tokenData["access_token"];
    },
    
    markOwned: async function() {
      const token = await App.accessToken();

      const url = App.baseURL.concat('getOwners');
      
      const response = await fetch(url, {
        method: "get",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token 
        },
      });
      
      const data = await response.json();
      console.log('owners object is', data);
      const owners = data.result;
      for (i = 0; i < owners.length; i++) {
        if (owners[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-stamp').eq(i).find('.btn-own').text("Own").attr('disabled', true);
          $('.panel-stamp').eq(i).find('#ownerAddress').empty();
          $('.panel-stamp').eq(i).find('#ownerAddress').append('Owner: ' + owners[i]).css({ wordWrap: "break-word" });
          
        }
      }
      // Use following only if need to check authority address
      // App.fetchAuthority();
    },
  
    fetchAuthority: async function() {
      const url = App.baseURL.concat('authority');
      const token = await App.accessToken();
  
      const response = await fetch(url, {
        method: "get",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token 
        },
      });
      const data = await response.json();
      console.log('authority is', data);
    },
    
    fetchActiveAccount: async function() {
      const accounts = await web3.eth.accounts;
      return accounts[0];
    },
    
    handleOwn: async function(event) {
      event.preventDefault();
  
      const account = await App.fetchActiveAccount();
      
      if (account) {
        if (confirm("Confirm ownership of this stamp, which can take up to a minute to record on the blockchain")) {
        
          const stampId = parseInt($(event.target).data('id'));
          $('.panel-stamp').eq(stampId).find('.btn-own').text("Processing").attr('disabled', true);
    
          
          console.log('account is', account);
          const url = App.baseURL.concat('setOwnership');
          const token = await App.accessToken();
    
          const reqBody = {
            "stampId": stampId,
            "owner": account
          };
    
          try {
            const response = await fetch(url, {
              method: "post",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
              },
              body: JSON.stringify(reqBody),
            });
            const data = await response.json();
            
            if (data.success) {
              App.markOwned();
            } else {
              $('.panel-stamp').eq(stampId).find('.btn-own').text("Own").attr('disabled', false);
            }
  
          } catch(err) {
            console.log(err);
          }
        }
      } else {
        alert("Ensure you have logged into your Metamask wallet to own this stamp ");
      }
    }
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  