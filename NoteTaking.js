$(document).ready(function () {
  let noteIdCounter = 1;

  // New note
  $('#add-note-form').submit(function (e) {
    e.preventDefault();
    const noteTitle = $('#note-title').val();
    const noteContent = $('#note-content').val();
    const notePosition = $('#note-position').val();
    if (noteTitle.trim() !== '' && noteContent.trim() !== '') {
      addNote(noteTitle, noteContent, notePosition);
    }
  });
 


  // Add a new note
  function addNote(title, content, position) {
    const noteId = 'note' + noteIdCounter++;
    const note = $('<div>').addClass('note').attr('id', noteId);
    const noteTitle = $('<h3>').text(title);
    const noteContent = $('<p>').text(content);
    const deleteButton = $('<button>').text('Delete').click(function () {
      removeNotePermanent(noteId);
    });
    const tempDeleteButton = $('<button>').text('Temp Delete').click(function () {
      removeNoteTemporary(noteId);
    });

    const noteButtons = $('<div>').addClass('note-buttons');
    noteButtons.append(deleteButton, tempDeleteButton);

    note.append(noteTitle, noteContent, noteButtons);

    // Append to selected position
    if (position === 'before') {
      note.insertBefore($('#note-container .note:first-child'));
    } else if (position === 'after') {
      note.insertAfter($('#note-container .note:last-child'));
    } else if (position === 'prepend') {
      note.prependTo('#note-container');
    }

    // Animation effect
    note.hide().slideDown();

    // Clear the input fields
    $('#note-title').val('');
    $('#note-content').val('');
  }

  // Function to remove a note permanently
  function removeNotePermanent(noteId) {
    $('#' + noteId).slideUp(400, function () {
      $(this).remove();
    });
  }

  // Function to temporarily remove a note
  function removeNoteTemporary(noteId) {
    const note = $('#' + noteId);

    // Animation effect
    note.slideUp(400, function () {
      // Add a "Restore" button using append
      $('<button>').text('Restore').click(function () {
        restoreNote(noteId);
      }).appendTo(note.find('.note-buttons'));
      // Append the detached note
      note.appendTo('#note-container');
    });
  }

  // Function to restore a temporarily removed note
  function restoreNote(noteId) {
    const note = $('#' + noteId);

    // Animation effect
    note.slideDown(400, function () {
      $(this).find('.note-buttons button').remove();
    });
  }
});