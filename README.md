# Behaviour Pattern TODO App

This TODO application is built following the **Behaviour Pattern**, a coding pattern that brings dependency injection concepts to React components. It's essentially a derivative of the Container/Presentational pattern that achieves complete separation of concerns between UI and business logic.

## What is the Behaviour Pattern?

The Behaviour Pattern is an approach that separates React components into two distinct parts:

1. **UI (Presentation) Logic**: Components that focus solely on rendering and user interactions
2. **Business Logic/State Management**: Custom hooks that encapsulate all the behavioral logic

### Core Concept

```tsx
// Component definition with behavior type
export type UseCounter = () => {
  count: number;
  increase: () => void;
};

export const Counter = (props: { useCounter: UseCounter }) => {
  const args = props.useCounter();
  return <button onClick={args.increase}>Count: {args.count}</button>;
};

// Behavior implementation
export const useCounter: UseCounter = () => {
  const [count, setCount] = useState(0);
  const increase = () => setCount(count + 1);
  return { count, increase };
};

// Usage
export const App = () => {
  return <Counter useCounter={useCounter} />;
};
```

In this pattern:
- The **target component** (`Counter`) receives only a specialized hook and uses it to obtain data and event handlers for rendering
- The **specialized hook** (`useCounter`) defines the behavior of the target component
- Each part has a single responsibility: the component focuses on presentation, the hook focuses on behavior

## Why Use This Pattern?

### Benefits

- **Clear Separation of Concerns**: UI and logic are completely separated, making code easier to understand and maintain
- **Enhanced Testability**: UI and behavior can be tested independently
- **Focus**: Developers can concentrate on either visual presentation or business logic without distraction
- **Storybook Integration**: Mock implementations allow pure UI testing without worrying about business logic
- **Reusability**: Both components and hooks can be reused in different contexts

### Real-World Example

The most representative example in this app is the `TodoItem` component, which demonstrates how the pattern scales to complex interactions:

#### File Structure
| Filename                                                                                   | Description                                              |
|---------------------------------------------------------------------------------------------|-------------------------------------------------------|
| [todo-item.stories.tsx](src/components/todo-item/todo-item.stories.tsx)   | Storybook stories (uses mock)                         |
| [todo-item.test.tsx](src/components/todo-item/todo-item.test.tsx)         | UI component tests                                    |
| [todo-item.tsx](src/components/todo-item/todo-item.tsx)                   | Component definition + UseTodoItem type               |
| [use-todo-item.mock.ts](src/components/todo-item/use-todo-item.mock.ts)   | Mock implementation for testing                       |
| [use-todo-item.test.tsx](src/components/todo-item/use-todo-item.test.tsx) | Behavior logic tests                                  |
| [use-todo-item.ts](src/components/todo-item/use-todo-item.ts)             | Real implementation with API calls                    |

This separation allows:
- **Storybook**: Use mock implementations to focus purely on visual design
- **Testing**: Test UI and logic independently with appropriate tools
- **Development**: Work on presentation and behavior separately

## Considerations

### When to Apply This Pattern

Best suited for components that make API calls or external integrations.

For simple components with only local state or refs, the traditional approach may be more appropriate.

### Potential Drawbacks

- **Increased Complexity**: More files and indirection can make code harder to follow initially
- **Learning Curve**: Developers need to understand the pattern before becoming productive
- **Overhead**: May be overkill for simple components

## Development Workflow

1. **Define the Interface**: Start with the behavior type interface
2. **Create Mock Implementation**: Build a simple mock for Storybook and initial testing
3. **Design the Component**: Focus purely on presentation using the mock
4. **Implement Real Behavior**: Add actual business logic, API calls, and state management
5. **Test Separately**: Write focused tests for both UI and behavior
