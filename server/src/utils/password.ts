import * as argon2 from 'argon2';
import crypto from 'crypto';

export class PasswordService {
    private static readonly PEPPER = process.env.PASSWORD_PEPPER || '';

    private static getPepperedPassword(password: string): string {
        return crypto.createHmac('sha256', this.PEPPER).update(password).digest('hex');
    }

    static async hashPassword(password: string): Promise<string> {
        if (!this.PEPPER) {
            throw new Error("Le Pepper n'est pas configuré dans l'environnement");
        }

        const input = this.getPepperedPassword(password);
        
        return await argon2.hash(input, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1
        });
    }

    static async verifyPassword(hash: string, password: string): Promise<boolean> {
        try {
            const input = this.getPepperedPassword(password);
            return await argon2.verify(hash, input);
        } catch (err) {
            return false;
        }
    }

}