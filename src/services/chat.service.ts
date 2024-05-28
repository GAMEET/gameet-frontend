import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatClientService, ChannelService, DefaultStreamChatGenerics } from 'stream-chat-angular';
import { Observable } from 'rxjs';
import { Channel } from 'stream-chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiKey = 'kkhwsa8ss3ke';
  private apiUrl = 'http://localhost:8080/api/perfil';

  constructor(
    private http: HttpClient,
    private chatClientService: ChatClientService<DefaultStreamChatGenerics>,
    private channelService: ChannelService<DefaultStreamChatGenerics>
  ) {}

  async connectUser() {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      throw new Error('JWT token not found in local storage');
    }

    try {
      // if (this.chatClientService.chatClient.userID) {
      //   await this.chatClientService.chatClient.disconnectUser();
      // }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
      const streamToken = await this.http
        .get<string>('http://localhost:8080/api/generaTokenChat', {
          headers,
          responseType: 'text' as 'json',
        })
        .toPromise();

      const decodedToken = this.decodeJwt(jwtToken);
      const userId = decodedToken.sub;

      await this.chatClientService.init(this.apiKey, userId, streamToken);
      console.log('Chat client initialized:', this.chatClientService.chatClient);

      if (!this.chatClientService.chatClient.userID) {
        throw new Error('Failed to initialize chat client');
      }

      console.log('Chat client initialized with user:', this.chatClientService.chatClient.userID);
    } catch (error) {
      console.error('Error during chat client initialization:', error);
      throw error;
    }
  }

  async createChannel(username: string): Promise<Channel<DefaultStreamChatGenerics>> {
    await this.connectUser();
    const userId = this.chatClientService.chatClient.userID;
    if (!userId) {
      throw new Error('User not connected');
    }

    await this.ensureUsersExist([userId, username]);

    const channel = this.chatClientService.chatClient.channel('messaging', {
      members: [userId, username],
      name: `Chat de ${userId} y ${username}`
    });

    await channel.watch();
    await channel.create();
    this.channelService.setAsActiveChannel(channel);
    return channel;
  }

  async getChannels(): Promise<Channel<DefaultStreamChatGenerics>[]> {
    await this.connectUser();
    console.log(this.chatClientService.chatClient)
    const userId = this.chatClientService.chatClient.userID;
    if (!userId) {
      throw new Error('User not connected');
    }
    const filters = { type: 'messaging', members: { $in: [userId] } };
    const sort = [{ last_message_at: -1 }];
    const channels = await this.chatClientService.chatClient.queryChannels(filters);

    return channels;
  }

  private async ensureUsersExist(userIds: string[]): Promise<void> {
    const existingUsers = await this.chatClientService.chatClient.queryUsers({
      id: { $in: userIds }
    });

    const existingUserIds = new Set(existingUsers.users.map(user => user.id));
    const missingUserIds = userIds.filter(userId => !existingUserIds.has(userId));

    if (missingUserIds.length > 0) {
      const users = missingUserIds.map(userId => ({ id: userId }));
      await this.chatClientService.chatClient.upsertUsers(users);
    }
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  private decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  async upsertUser(username: string): Promise<void> {
    const client = this.chatClientService.chatClient;
    await client.upsertUsers([{ id: username }]);
  }
}
