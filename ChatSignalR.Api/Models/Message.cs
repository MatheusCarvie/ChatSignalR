﻿namespace ChatSignalR.Api.Models
{
    public class Message
    {
        public User User { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
