package com.company.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Qna {
    private int qno;
    private int lev;
    private int parno;
    private String title;
    private String content;
    private String author;
    private String resdate;
    private int hits;
}
