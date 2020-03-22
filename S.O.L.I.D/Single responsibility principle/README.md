# The single responsibility principle (SRP)

## Definition
A module should have only one reason to change (by module we mean class or method, function).

## Description
The key thing of SRP is decomposition for decreasing complexity and relations. SRP means that module should do only one job. Following this principle means that each complex class should be separated into a few simple classes considering defined responsibility. And also SRP means joining similar functionality (that could be spread on different classes) in a single class. Anti pattern for that principle is God object or Swiss Army Class.

Use this principle when
- You need flexible and easy to change (or delete) code.
- Hard to say where is vector for changes.
- You need reduce the number of relationships between elements in system.

Don't use SRP if
- You're sure your 'mixed job' class never going to be changed.
- Following SRP will substantially increase development and code support time.

Wrong implementation of SRP follows for many small classes with unclear responsibility.

SRP requires balance between the amount of new classes and SRP. For example, popular in frameworks pattern ActiveRecord violates SRP. ActiveRecord class combines a lot of different functionality, business logic and data layer. But often ActiveRecord is useful and appropriate. So, practice shows us that SRP is not a dogma and could be violated.

```typescript
// BAD
class AuthService {
  isUserAuthed(): boolean {
    if (this.readJWTFromCookie()) {
      return true
    }

    return false
  }
  readJWTFromCookie(): string | null {}
  saveJWTInCookie(token: string): void {}
}

// GOOD
class CookieService {
  get(name: string): string | null {}
  set(name: string, value: string): void {}
}
```