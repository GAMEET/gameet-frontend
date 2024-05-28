import { Component, OnInit } from '@angular/core';
import { ChatService } from './../../services/chat.service';
import { Channel } from 'stream-chat';
import { ChatClientService, ChannelService, DefaultStreamChatGenerics } from 'stream-chat-angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  channels: Channel<DefaultStreamChatGenerics>[] = [];
  activeChannel: Channel<DefaultStreamChatGenerics> | undefined;

  constructor(private chatService: ChatService, private channelService : ChannelService) {}

  async ngOnInit() {
    try {
      await this.chatService.connectUser();
      this.channels = await this.chatService.getChannels();
      console.log('Channels loaded:', this.channels);
    } catch (error) {
      console.error('Error connecting user or loading channels:', error);
    }
  }

  setActiveChannel(channel: Channel<DefaultStreamChatGenerics>) {
    this.activeChannel = channel;
    this.channelService.setAsActiveChannel(channel);
  }

  async createChatChannel(username: string) {
    try {
      this.activeChannel = await this.chatService.createChannel(username);
      console.log('Channel created:', this.activeChannel);
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  }

  async switchUser(newToken: string) {
    try {
      localStorage.setItem('token', newToken);
      await this.chatService.connectUser();
      this.channels = await this.chatService.getChannels();
      console.log('Switched user and reloaded channels:', this.channels);
    } catch (error) {
      console.error('Error switching user:', error);
    }
  }
}
