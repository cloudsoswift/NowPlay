package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.dto.ownerComment.OwnerCommentPostDto;
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
@CrossOrigin(origins = {"https://j8d110.p.ssafy.io", "http://127.0.0.1:5173", "http://localhost:5173", "http://172.30.1.95"}, allowCredentials = "true")
@RequestMapping("/places")
public class OwnerCommentController {

    @Autowired
    private final OwnerCommentService ownerCommentService;

    @PostMapping("/{id}/comments")
    public ResponseEntity<?> writeOwnerComments(@PathVariable int id,
                                                @RequestBody OwnerCommentPostDto OwnerCommentPostDto) throws Exception {
        ownerCommentService.writeOwnerComment(id, OwnerCommentPostDto);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getOwnerComment(@PathVariable int id) throws Exception{
        return ResponseEntity.ok(ownerCommentService.getOwnerComment(id));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<?> updateOwnerComment(@PathVariable int id,
                                                @RequestBody OwnerCommentPostDto ownerCommentPostDto) throws Exception {
        ownerCommentService.updateOwnerComment(id, ownerCommentPostDto);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}/comments")
    public ResponseEntity<?> deleteOwnerComment(@PathVariable int id) throws Exception {
        ownerCommentService.deleteOwnerComment(id);
        return ResponseEntity.ok(null);
    }
}
