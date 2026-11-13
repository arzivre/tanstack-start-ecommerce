import { AccountLayout } from "#/components/containers/store/accounts/account-layout";
import ProfileForm from "./profile-form";
import { SecuritySettings } from "../security-settings";

export function ProfileTemplate() {
    return (
        <AccountLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Profile
                    </h1>
                </div>
                <ProfileForm />
                <SecuritySettings />
            </div>
        </AccountLayout>
    );
}
