import { MediatorType } from "../Mediator";

export {};

declare global {
  interface Window {
    entando?: {
      globals?: {
        mediator?: MediatorType;
      }
    };
  }
}