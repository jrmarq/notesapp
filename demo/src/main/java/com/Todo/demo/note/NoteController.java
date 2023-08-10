package com.Todo.demo.note;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.Todo.demo.note.NoteService;

import java.util.List;

// this will have all the resources fot the API
@RestController
@RequestMapping(path = "/api/notes")

public class NoteController {

    private final NoteService noteService;
    @Autowired
    public NoteController(NoteService noteService){
        this.noteService = noteService;
    }

    @GetMapping
    public List<Note> getNotes(){
        return noteService.getNotes();
    }
    @PostMapping
    public void registerNewNote(@RequestBody Note note){
        noteService.addNewNote((note));
    }
    @DeleteMapping(path = "/{noteId}")
    public void deleteNote(@PathVariable("noteId") Long noteId) {
        noteService.deleteNote(noteId);
    }

}
