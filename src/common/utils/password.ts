import * as crypto from 'crypto';


export function salt (rounds: number): string {
  return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
};

export function sign(password: string, salt: string): string {
  const hmac = crypto.createHmac(process.env.HASH_ALGORITHM, salt);
  hmac.update(password);
  const hash = hmac.digest('hex');
  return `${salt}:${hash}`;
}

export function compare(password: string, signature: string): boolean {
  const [salt] = signature.split(':');
  const passwordData = sign(password, salt);
  if (passwordData.split(':')[1] === signature.split(':')[1]) {
    return true;
  }
  return false;
}