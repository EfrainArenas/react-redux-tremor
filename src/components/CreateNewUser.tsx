import { Button } from "./Button";
import { Card } from "./Card";
import { TextInput } from "./TextInput";
import { useUserActions } from '../hooks/useUserActions'
import { useState } from "react";
import { Badge } from "./Badge";

export function CreateNewUser() {
    const { addUser } = useUserActions();
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handleSubmit = (event) => {
        event.preventDefault();
        setResult(null)
        const form = event.target
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        if (!name || !email || !github) {
            return setResult('ko')
        }

        addUser({ name, email, github })
        setResult('ok')
        form.reset()
    }
    return (
        <Card className="text-white">
            <p>Hey</p>
            <form onSubmit={handleSubmit}>
                <TextInput name="name" placeholder="Name" />
                <TextInput name="email" placeholder="Email" />
                <TextInput name="github" placeholder="Github" />
                <div>
                    <Button
                        type="submit"
                    >
                        Create user
                    </Button>
                </div>
                <div>
                    <span>
                        {result == 'ok' && <Badge color="green">Saved!</Badge>}
                        {result == 'ko' && <Badge color="red">Error!</Badge>}
                    </span>
                </div>
            </form>
        </Card>
    )
}