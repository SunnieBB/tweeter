$(() => {
  const textarea = $('.new-tweet textarea');
  textarea.on('keyup', () => {
  
    const textLength = textarea.val().length;
    
    const count = textarea.parent().children('.counter');
    
    count.text(140 - textLength);
    140 - textLength < 0 ? count.css('color', 'red') : count.css('color', '');
  });

});