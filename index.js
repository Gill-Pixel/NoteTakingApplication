$(document).ready(function () {
    // Counter for unique IDs
    let noteIdCounter = 1;

    // Form submission to add a new note
    $('#add-note-form').submit(function (e) {
      e.preventDefault();
      const noteContent = $('#note-content').val();
      const notePosition = $('#note-position').val();
      if (noteContent.trim() !== '') {
        addNote(noteContent, notePosition);
      }
    });

    // Function to add a new note to the panel
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

      // Append the note to the panel based on the selected position
      if (position === 'before') {
        note.insertBefore($('#note-container .note:first-child'));
      } else if (position === 'after') {
        note.insertAfter($('#note-container .note:last-child'));
      } else if (position === 'prepend') {
        note.prependTo('#note-container');
      }

      // Animation effect (custom CSS - slide down)
      note.css('transform', 'translateY(-50px)');
      setTimeout(function () {
        note.css('transform', 'translateY(0)');
      }, 0);

      // Clear the input field
      $('#note-content').val('');
    }

    // Function to remove a note permanently
    function removeNotePermanent(noteId) {
      // Using remove method
      $('#' + noteId).remove();
    }

    // Function to temporarily remove a note
    function removeNoteTemporary(noteId) {
      const note = $('#' + noteId);

      // Animation effect (custom CSS - slide up)
      note.css('transform', 'translateY(-50px)');
      setTimeout(function () {
        // Using detach method
        note.detach();
        // Add a "Restore" button using appendTo method
        $('<button>').text('Restore').click(function () {
          restoreNote(noteId);
        }).appendTo(note);
        // Append the detached note to the panel
        note.appendTo('#note-container');
      }, 300);
    }

    // Function to restore a temporarily removed note
    function restoreNote(noteId) {
      const note = $('#' + noteId);

      // Animation effect (custom CSS - slide down)
      note.css('transform', 'translateY(0)');
      // Remove the "Restore" button using remove method
      note.find('button').remove();
      // Append the note back to the original position using appendTo method
      note.appendTo('#note-container');
    }
  });