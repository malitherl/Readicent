import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/initSupabase";

export const useProgress = (user: User) => {

    const [dailyGoal, setDailyGoal] = useState(0);

    useEffect(() => {
        if(user) {
            fetchDailyGoal();
        }
    }, [])

    async function fetchDailyGoal() {
        try{
            const {data, error} = await supabase
            .from('progress')
            .select("*")
            .eq("user", user!.id)
            if(error) {
                throw error
            } else {
                const daily = data.map(d => d.goal)
                setDailyGoal(daily[0]);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        }
    }
    
    return dailyGoal;
}