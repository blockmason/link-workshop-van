App = {
  web3Provider: null,
  contracts: {},

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
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Ownership.json', function(data) {
     // Get the necessary contract artifact file and instantiate it with truffle-contract
     const OwnershipArtifact = data;
     App.contracts.Ownership = TruffleContract(OwnershipArtifact);

     // Set the provider for our contract
     App.contracts.Ownership.setProvider(App.web3Provider);

     // Use our contract to retrieve and mark the adopted pets
     return App.markOwned();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-own', App.handleOwn);

  },

  markOwned: function(adopters, account) {
    let ownershipInstance;

    App.contracts.Ownership.deployed().then(function(instance) {
      ownershipInstance = instance;

      return ownershipInstance.getOwners.call();
    }).then(function(owners) {
      for (i = 0; i < owners.length; i++) {
        if (owners[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-stamp').eq(i).find('.btn-own').text("Own").attr('disabled', true);
          $('.panel-stamp').eq(i).find('#ownerAddress').empty();
          $('.panel-stamp').eq(i).find('#ownerAddress').append('Owner: ' + owners[i]).css({ wordWrap: "break-word" });
          
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
  
  fetchActiveAccount: async function() {
    const accounts = await web3.eth.accounts;
    return accounts[0];
  },
  
  handleOwn: async function(event) {
    event.preventDefault();

    const stampId = parseInt($(event.target).data('id'));
    $('.panel-stamp').eq(stampId).find('.btn-own').text("Processing").attr('disabled', true);
    let ownershipInstance;
    
    const account = await App.fetchActiveAccount();

    if (account) {
      App.contracts.Ownership.deployed().then(function(instance) {
        ownershipInstance = instance;

        return ownershipInstance.setOwnership(stampId, {from: account});
      }).then(function(result) {
        console.log('transaction result is', result);
        setTimeout(function() {
          App.markOwned();
        }, 15000);
      }).catch(function(err) {
        $('.panel-stamp').eq(stampId).find('.btn-own').text("Own").attr('disabled', false);
        console.log(err.message);
      });
    } else {
      alert("Ensure you have logged into your Metamask wallet to own this stamp ");
    }
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
