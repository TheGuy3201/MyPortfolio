import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Please fill a valid email address'],
        required: 'Email is required',
        maxlength: [254, 'Email must not exceed 254 characters']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    hashed_password: {
        type: String,
        required: 'Password is required'
    }
});

UserSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        // Use 12 salt rounds for good security
        this.hashed_password = bcrypt.hashSync(password, 12);
    })
    .get(function() {
        return this._password;
    });

UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 8) {
        this.invalidate('password', 'Password must be at least 8 characters.');
    }
    if (this._password && this._password.length > 128) {
        this.invalidate('password', 'Password must not exceed 128 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

UserSchema.methods = {
    authenticate: function(plainText) {
        return bcrypt.compareSync(plainText, this.hashed_password)
    }
}

export default mongoose.model('User', UserSchema);