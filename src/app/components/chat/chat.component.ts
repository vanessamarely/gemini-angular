import { Component } from '@angular/core';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  genAI = new GoogleGenerativeAI(environment.API_KEY);

  generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
    temperature: 0.9,
    top_p: 1,
    top_k: 32,
    maxOutputTokens: 100, // limit output
  };

  model = this.genAI.getGenerativeModel({
    model: 'gemini-1.5-pro-latest',
  });

  message: string = '';
  userInput: string = '';

  async sendMessage() {
    if (this.userInput) {
      const result = await this.model.generateContent(this.userInput);
    const response = await result.response;
      this.message = response.text();
    }
  }
}
