import RegisterForm from "../_components/RegisterForm"

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                {/* Form Generic Texts */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome to Our Next Press</h1>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod excepturi quasi et? Doloremque autem eos praesentium repellat iure natus sequi.</p>
                </div>

                {/* Form */}
                <RegisterForm />
            </div>
        </div>
  )
}

export default Register