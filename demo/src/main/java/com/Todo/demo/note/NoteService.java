package com.Todo.demo.note;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
//"business layer"
@Service
public class NoteService {
    private final NoteRepository noteRepository;
    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @GetMapping
    public List<Note> getNotes() {
        return noteRepository.findAll();
    }

    public void addNewNote(Note note) {
        noteRepository.save(note);
    }
    public void deleteNote(Long noteId) {
        boolean exists = noteRepository.existsById(noteId);
        if (!exists) {
            throw new IllegalStateException("note with id " + noteId + " does not exist.");
        }
        noteRepository.deleteById(noteId);
    }

}
