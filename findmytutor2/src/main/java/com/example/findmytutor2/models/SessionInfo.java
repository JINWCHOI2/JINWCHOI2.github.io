package com.example.findmytutor2.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sessionInfos")
public class SessionInfo {
    @Id
    private String daysOfWeek;
    private long from;
    private long to;

    public SessionInfo(String daysOfWeek, long from, long to) {
        this.daysOfWeek = daysOfWeek;
        this.from = from;
        this.to = to;
    }

    public String getDaysOfWeek() {
        return daysOfWeek;
    }

    public void setDaysOfWeek(String daysOfWeek) {
        this.daysOfWeek = daysOfWeek;
    }

    public long getFrom() {
        return from;
    }

    public void setFrom(long from) {
        this.from = from;
    }

    public long getTo() {
        return to;
    }

    public void setTo(long to) {
        this.to = to;
    }


}
