import { useRouter } from "next/router";
import { useEffect } from "react";
import crypto from "crypto";

export const useAuthenticate = () => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const authTime = sessionStorage.getItem("auth_tm");
            // After 30 minutes, Re-authenticate
            if (authTime == null || Math.abs(new Date().getTime() - +authTime) > 30 * 60 * 1000) {
                const password = prompt("비밀번호를 입력하세요.") as string;
                if (password == null) router.back();
                const { isAuthenticated } = await fetch("/api/admin/auth?__r_pw=" + crypto.createHash("sha256").update(password).digest("hex")).then((response: any) => response.json());
                if (!isAuthenticated) {
                    alert("권한이 없습니다.");
                    router.back();
                } else sessionStorage.setItem("auth_tm", new Date().getTime().toString());
            } else sessionStorage.setItem("auth_tm", new Date().getTime().toString());
        })();
    }, [router]);
};