package com.ssafy.specialized.controller;

import com.ssafy.specialized.service.OwnerCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.server.ExportException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/places")
public class OwnerCommentController {

    @Autowired
    private final OwnerCommentService ownerCommentService;

    @PostMapping("/{id}/comments")
    public ResponseEntity<?> writeOwnerComments(@PathVariable int id,
                                                @RequestBody String comment) throws Exception {
        ownerCommentService.writeOwnerComment(id, comment);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getOwnerComment(@PathVariable int id) throws Exception{
        return ResponseEntity.ok(ownerCommentService.getOwnerComment(id));
    }

    @PutMapping("/{id}/comments")
    public ResponseEntity<?> updateOwnerComment(@PathVariable int id,
                                                @RequestBody String comment) throws Exception {
        ownerCommentService.updateOwnerComment(id, comment);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}/comments")
    public ResponseEntity<?> deleteOwnerComment(@PathVariable int id) throws Exception {
        ownerCommentService.deleteOwnerComment(id);
        return ResponseEntity.ok(null);
    }
}
