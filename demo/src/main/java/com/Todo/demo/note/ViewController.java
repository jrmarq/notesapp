package com.Todo.demo.note;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/note")
    public String home() {
        return "index";
    }
}
