App = {
  clientId: "",
  clientSecret: "",
  authURL: 'https://api.block.mason.link/oauth2/token',
  baseURL: "",
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
    //Fetch auth token from Link
  },
  
  markOwned: async function() {
    //Mark stamp ownership
    App.accessToken();
  },

  fetchAuthority: async function() {
    // For testing, identify contract authority address
  },
  
  fetchActiveAccount: async function() {
    // Same as in activity 2
  },
  
  handleOwn: async function(event) {
    event.preventDefault();
    // Assign ownership of stamps
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
