import { Stack } from "expo-router";

const App = () => {
  const isAuthenticated = false; // Replace with your actual authentication logic
  return <Stack>
    {/* Public routes */}
    <Stack.Protected guard={!isAuthenticated}>
      <Stack.Screen name="(auth)/login"/>
    </Stack.Protected>
  </Stack>;
}

export default function RootLayout() {
  return <>
    <App />
  </>;
}
