//  REVIEW: Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      /* TODO: If the select box changes to an option that has a value, we should:
      1. Hide all of the articles
      2. Fade in only the articles that match based on on the author
      that was aselected. Hint: use an attribute selector to find
      those articles that match the value, and then fade them in.
      */
      var currentAuthor = $(this).val();
      $('article').fadeOut(500);
      $('article').each(function(){
        if($(this).attr('data-author') === currentAuthor){
          $(this).fadeIn(1000);
        }
      });
    } else {
      /* Otherwise, we should:
      1. Show all the articles except the template */
      $('article').not('.template').fadeIn(1500);
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      /* TODO: If the select box changes to an option that has a value, we should:
      1. Hide all of the articles
      2. Fade in only the articles that match based on on the category
      that was aselected. Hint: use an attribute selector to find
      those articles that match the value, and then fade them in.
      */
      var currentCategory = $(this).val();
      $('article').fadeOut(500);
      $('article').each(function(){
        if($(this).attr('data-category') === currentCategory){
          $(this).fadeIn(1000);
        }
      });
    } else {
      /* Otherwise, we should:
      1. Show all the articles except the template */
      $('article').not('.template').fadeIn(1500);
    }
    $('#author-filter').val('');
  });
  /* TODO: Just like we do for #category-filter above, we should also handle
  change events on the #category-filter element. Be sure to reset the
  #category-filter while you're at it! */
};

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    /* TODO:
    1. Hide all of the .tab-content sections
    2. Fade in the single .tab-content section that is
    associated with the .tab element's data-content attribute.
    */
  });
  $('.main-nav .tab:first').click();
};


/* TODO: Add a delegated event handler to reveal the remaining paragraphs.
When a .read-on link is clicked, we can:
1. Prevent the default action of a link.
2. Reveal everything in that particular article now.
3. Hide that read-on link!

// STRETCH GOAl!: change the 'Read On' link to 'Show Less'
*/
// $('article').each(function(){
//   $(this).find('p:not-first').hide();
// });
// $('.read-on').click(function(){
//   $(this).find('p:not-first').show();
// });
articleView.setTeasers = function() {
  // Truncate logic to show only first two elements within the article body.
  $('.article-body *:nth-of-type(n+2)').hide();
  var thisShown = false;
  if(thisShown === false){
    $('#articles').on('click', 'a.read-on', function(show){
      show.preventDefault();
      $(this).parent().find('*').show();
      $(this).removeClass().addClass('show-less').html('&larr; Show less').click(function(){
        $('.article-body *:nth-of-type(n+2)').hide();
        console.log(thisShown);
      });
    });
    thisShown = true;
    if(thisShown === true){
      $('#articles').on('click', 'a.show-less', function(show){
        show.preventDefault();
        console.log('wat');
        $(this).removeClass().addClass('read-on').html('Read on &rarr;');
        thisShown = false;
      });
    }
  }
};

$('#about-nav').click(function(){
  $('#filters').fadeOut(500);
  $('article').fadeOut(500);
  $('about').fadeIn(1000);
});

$('#home-nav').click(function(){
  $('#filters').fadeIn(1000);
  $('article').fadeIn(1000);
  $('about').fadeOut(500);
});

articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.setTeasers();
