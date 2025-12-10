export interface AuthPort {
  getUserById(userId: number): Promise<{ id: number } | null>;
}
