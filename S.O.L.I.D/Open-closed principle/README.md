# The Open-Closed Principle (OCP)

## Definition
Object or enitities should be open for extension but closed for modification.

## Description
Open for extension means possibility to add new behaviour. Closed for modification means prohibition to change source code. How is this possible? Following OCP means entity could be changed by adding new code, but not by changing the source code. If you want to change entity (class, module, function, etc.) you need to extend it and override the behaviour of the original entity.

Method `getLastMessage` returns text of a last message in a store.

```typescript
class MessageStore {
  private data = [{
    text: 'Hey!',
    datetime: '1584900114465',
    author: {
      id: '1234',
      fname: 'John',
      lname: 'Doe',
    }
  }]

  getLastMessage(): Message {
    return this.data[this.data.length - 1]
  }
}

class MessageRenderer {
  private messageStore = new MessageStore()

  renderLastMessage(): string {
    const message = this.messageStore.getLastMessage()

    return message.text
  }
}
```

But what to do if we need to have other message fields? For example, author name to render in UI. We can modify method `getLastMessage` but it's a risky way.

```typescript
// BAD
class MessageRenderer {
  private messageStore = new MessageStore()

  renderLastMessage(): string {
    const message = this.messageStore.getLastMessage()

    return `${message.author.fname} : ${message.text}`
  }
}
```

The solution is to create new class.

```typescript
// GOOD
class FullMessageRenderer extends MessageRenderer {
  renderLastMessage(): string {
    const message = this.messageStore.getLastMessage()

    return `${message.author.fname} : ${message.text}`
  }
}
```