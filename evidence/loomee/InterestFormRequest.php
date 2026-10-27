<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InterestFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'interest' => 'required|in:yes,no',
            'buyDate' => 'nullable|date|after_or_equal:today', // Assuming buyDate is the input name for purchase date
            'product_title' => 'required|string',
            'user_email' => 'required|string|email',
            'price' => 'nullable|regex:/^R\s\d{1,3}(,\d{3})*$/',
            'promotion' => 'nullable|string|max:10',
        ];
    }
}
