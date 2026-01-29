import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cloud } from "@/lib/cloud";
import { useAuth } from "@/hooks/use-auth";

export default function AdminLogin() {
  const nav = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLogin() {
    setLoading(true);
    setError(null);
    const { error: err } = await cloud.auth.signInWithPassword({ email: email.trim(), password });
    if (err) setError(err.message);
    setLoading(false);
    if (!err) nav("/admin");
  }

  async function onSignup() {
    setLoading(true);
    setError(null);
    const { error: err } = await cloud.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    if (err) setError(err.message);
    setLoading(false);
    if (!err) nav("/admin");
  }

  if (user) {
    nav("/admin");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16">
        <div className="mx-auto max-w-lg">
          <Card className="glass rounded-3xl p-8 shadow-elevated">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-border-strong/40 bg-background shadow-elevated">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-display text-2xl font-semibold">Acceso administrador</h1>
                <p className="text-sm text-muted-foreground">Gestioná propiedades reales y publicalas.</p>
              </div>
            </div>

            <div className="mt-7 grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pass">Contraseña</Label>
                <Input id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <div className="grid gap-2 sm:grid-cols-2">
                <Button variant="default" onClick={onLogin} disabled={loading || !email || !password}>
                  Ingresar
                </Button>
                <Button variant="outline" onClick={onSignup} disabled={loading || !email || !password}>
                  Crear cuenta
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Si es tu primera vez, creá la cuenta con tu email. Luego, desde el panel podrás activar el rol de admin.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
