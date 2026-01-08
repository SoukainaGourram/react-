import { View, Text, FlatList, Button, TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import {
    loadTodos,
    addTodoOffline,
    updateTodoOffline,
    deleteTodoOffline,
} from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListOfflineScreen() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);

    const { theme, toggleTheme } = useContext(ThemeContext);

    const refreshTodos = () => {
        setTodos(loadTodos());
    };

    const handleAddOrUpdate = () => {
        if (!title.trim()) return;

        if (editingId) {
            // UPDATE OFFLINE 
            updateTodoOffline(editingId, title);
            setEditingId(null);
        } else {
            // ADD OFFLINE 
            addTodoOffline(title);
        }

        setTitle("");
        refreshTodos();
    };

    const handleDelete = (id) => {
        deleteTodoOffline(id);
        refreshTodos();
    };

    useEffect(() => {
        refreshTodos();
    }, []);

    return (
        <>
            {/* Theme toggle */}
            <Button
                title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
                onPress={toggleTheme}
            />

            {/* Add / Update */}
            <View style={{ padding: 10 }}>
                <TextInput
                    placeholder="Tâche offline"
                    value={title}
                    onChangeText={setTitle}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        marginBottom: 10,
                        color: theme === "dark" ? "#ffffff" : "#000000",
                        borderColor: theme === "dark" ? "#ffffff" : "#cccccc",
                    }}
                />

                <Button
                    title={editingId ? "✏ Mettre à jour" : "➕ Ajouter hors ligne"}
                    onPress={handleAddOrUpdate}
                />
            </View>

            {todos.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 20, color: theme === "dark" ? "#ffffff" : "#000000" }}>
                    Aucune tâche disponible hors ligne
                </Text>
            ) : (
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 10,
                            }}
                        >
                            <Text style={{ color: theme === "dark" ? "#ffffff" : "#000000", flex: 1 }}>{item.title}</Text>

                            <View style={{ flexDirection: "row" }}>
                                <Button
                                    title="✏"
                                    onPress={() => {
                                        setTitle(item.title);
                                        setEditingId(item.id);
                                    }}
                                />
                                <View style={{ width: 10 }} />
                                <Button
                                    title="🗑️"
                                    onPress={() => handleDelete(item.id)}
                                    color="red"
                                />
                            </View>
                        </View>
                    )}
                />
            )}
        </>
    );
} 
