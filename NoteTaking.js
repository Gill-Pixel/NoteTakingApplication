$(document).ready(function () {
    let noteIdCounter = 1;

    //new note
    $('#add-note-form').submit(function (e) {
      e.preventDefault();
      const noteContent = $('#note-content').val();
      const notePosition = $('#note-position').val();
      if (noteContent.trim() !== '') {
        addNote(noteContent, notePosition);
      }
    });

    // add a new note
    function addNote(content, position) {
      const noteId = 'note' + noteIdCounter++;
      const note = $('<div>').addClass('note').attr('id', noteId).text(content);
      const deleteButton = $('<button>').text('Delete').click(function () {
        removeNotePermanent(noteId);
      });
      const tempDeleteButton = $('<button>').text('Temp Delete').click(function () {
        removeNoteTemporary(noteId);
      });

      note.append(deleteButton, tempDeleteButton);

      // Append to selected position
      if (position === 'before') {
        note.insertBefore($('#note-container .note:first-child'));
      } else if (position === 'after') {
        note.insertAfter($('#note-container .note:last-child'));
      } else if (position === 'prepend') {
        note.prependTo('#note-container');
      }

      // Animation effect
      note.css('transform', 'translateY(-50px)');
      setTimeout(function () {
        note.css('transform', 'translateY(0)');
      }, 0);

      // Clear the input field
      $('#note-content').val('');
    }

    // Function to remove a note permanently
    function removeNotePermanent(noteId) {
      $('#' + noteId).remove();
    }

    // Function to temporarily remove 
    function removeNoteTemporary(noteId) {
      const note = $('#' + noteId);

      // Animation effect
      note.css('transform', 'translateY(-50px)');
      setTimeout(function () {
        note.detach();
        // Add a "Restore" button using appendTo method
        $('<button>').text('Restore').click(function () {
          restoreNote(noteId);
        }).appendTo(note);
        // Append the detached note
        note.appendTo('#note-container');
      }, 300);
    }

    // Function to restore a temporarily
    function restoreNote(noteId) {
      const note = $('#' + noteId);

      // Animation effect
      note.css('transform', 'translateY(0)');
      note.find('button').remove();
      // Append to the original position
      note.appendTo('#note-container');
    }
  });