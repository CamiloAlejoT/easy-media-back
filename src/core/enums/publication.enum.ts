import { maxMessageLength, maxTitleLength } from 'src/core/constants/constants'
export enum PUBLICATION {
    TITLEMAXLENGHT = "The max lenght for a title is " + maxTitleLength,
    TITLEISSTRING = "Title must be a string",
    TITLEISEMPTY = "Title is required",
    MESSAGEMAXLENGTH = "The max lenght for a message is " + maxMessageLength,
    MESSAGEISSTRING = "Message must be a string",
    MESSAGEEMPTY = "Message is required",
    AUTHORISTRING = "Author must be a string",
    AUTHORISEMPTY = "Author is required"

}